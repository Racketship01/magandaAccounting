import { c as createBillSchema, a as createBill } from '../../_/billRepository.mjs';
import { d as defineEventHandler, h as adminSession, r as readBody, c as createError, e as prisma, f as pushNotification, H as H3Error } from '../../_/nitro.mjs';
import 'zod';
import '@adonisjs/hash';
import '@adonisjs/hash/drivers/scrypt';
import 'node:path';
import 'node:url';
import '@prisma/client/runtime/client';
import '@prisma/adapter-pg';
import 'node:events';
import 'ioredis';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:buffer';
import '@iconify/utils';
import 'consola';
import 'node:fs';

const createBill_post = defineEventHandler(async (event) => {
  const user = await adminSession(event);
  const body = await readBody(event);
  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing bill information"
    });
  }
  const result = createBillSchema.safeParse(body);
  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Validation failed",
      data: result.error.flatten().fieldErrors
    });
  }
  const admin = await prisma.admin.findFirst({
    where: { userId: user.id }
  });
  if (!admin) {
    throw createError({
      statusCode: 404,
      statusMessage: "Admin profile not found"
    });
  }
  try {
    const createResult = await createBill(result.data, admin.id);
    if (!createResult) {
      throw createError({
        statusCode: 404,
        statusMessage: "Bill not found"
      });
    }
    if (createResult.adminUserId && result.data.reminderEnabled) {
      await pushNotification({
        userId: createResult.adminUserId,
        type: "bill_due",
        title: `New bill: ${result.data.title}`,
        description: `Due ${result.data.dueDate} \u2014 ${result.data.amount} ${result.data.currency || ""}`,
        icon: "i-lucide-bell",
        billId: createResult.bill.id
      });
    }
    return { bill: createResult.bill };
  } catch (error) {
    if (error instanceof H3Error) throw error;
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error"
    });
  }
});

export { createBill_post as default };
//# sourceMappingURL=createBill.post.mjs.map
