import { u as updateBillSchema, b as updateBill } from '../../../_/billRepository.mjs';
import { d as defineEventHandler, h as adminSession, r as readBody, c as createError, f as pushNotification } from '../../../_/nitro.mjs';
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

const _idBill__patch = defineEventHandler(async (event) => {
  var _a;
  await adminSession(event);
  const body = await readBody(event);
  const validationResult = updateBillSchema.safeParse(body);
  if (!validationResult.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Validation failed",
      data: validationResult.error.flatten().fieldErrors
    });
  }
  const id = (_a = event.context.params) == null ? void 0 : _a.idBill;
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bill ID is required"
    });
  }
  const result = await updateBill(id, validationResult.data);
  if (result.adminUserId && !result.wasPaid && result.isNowPaid) {
    await pushNotification({
      userId: result.adminUserId,
      type: "bill_paid",
      title: `Bill paid: ${result.bill.title}`,
      description: `${result.bill.amount} ${result.bill.currency || ""}`,
      icon: "i-lucide-bell",
      billId: result.bill.id
    });
  }
  return { bill: result.bill };
});

export { _idBill__patch as default };
//# sourceMappingURL=_idBill_.patch.mjs.map
