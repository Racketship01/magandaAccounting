import { createBill } from "../repository/billRepository";
import { createBillSchema } from "../schemas";
import { defineEventHandler, readBody, createError, H3Error } from "h3";
import adminSession from "../../../../layers/profile/server/utils/roleSession";
import { prisma } from "../../../../prisma/utils/prisma";

export default defineEventHandler(async (event: any) => {
  const user = await adminSession(event);

  const body = await readBody(event);

  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing bill information",
    });
  }

  // Validate request body using createBillSchema
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
    const bill = await createBill(result.data, admin.id);

    if (!bill) {
      throw createError({
        statusCode: 404,
        statusMessage: "Bill not found",
      });
    }
    return { bill };
  } catch (error: any) {
    if (error instanceof H3Error) throw error;
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
