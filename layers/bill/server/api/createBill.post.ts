import { createBill } from "../repository/billRepository";
import { createBillSchema } from "../schemas";
import { defineEventHandler, readBody, createError, H3Error } from "h3";
import adminSession from "../../../../layers/profile/server/utils/roleSession";
import { prisma } from "../../../../prisma/utils/prisma";
import { pushNotification } from "../../../../layers/base/server/repository/notificationRepository";

export default defineEventHandler(async (event: any) => {
  const user = await adminSession(event);

  const body = await readBody(event);

  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing bill information",
    });
  }

  const result = createBillSchema.safeParse(body);
  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Validation failed",
      data: result.error.flatten().fieldErrors,
    });
  }

  const admin = await prisma.admin.findFirst({
    where: { userId: user.id },
  });

  if (!admin) {
    throw createError({
      statusCode: 404,
      statusMessage: "Admin profile not found",
    });
  }

  try {
    const createResult = await createBill(result.data, admin.id);

    if (!createResult) {
      throw createError({
        statusCode: 404,
        statusMessage: "Bill not found",
      });
    }

    if (createResult.adminUserId && result.data.reminderEnabled) {
      await pushNotification({
        userId: createResult.adminUserId,
        type: "bill_due",
        title: `New bill: ${result.data.title}`,
        description: `Due ${result.data.dueDate} — ${result.data.amount} ${result.data.currency || ""}`,
        icon: "i-lucide-bell",
        billId: createResult.bill.id,
      });
    }

    return { bill: createResult.bill };
  } catch (error: any) {
    if (error instanceof H3Error) throw error;
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
