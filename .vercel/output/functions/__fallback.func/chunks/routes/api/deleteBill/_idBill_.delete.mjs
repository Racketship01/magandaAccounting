import { d as defineEventHandler, h as adminSession, j as getRouterParam, c as createError } from '../../../_/nitro.mjs';
import { d as deleteBill } from '../../../_/billRepository.mjs';
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
import 'zod';

const _idBill__delete = defineEventHandler(async (event) => {
  await adminSession(event);
  const id = getRouterParam(event, "idBill");
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bill not found"
    });
  }
  const removeBill = await deleteBill(id);
  return { removeBill };
});

export { _idBill__delete as default };
//# sourceMappingURL=_idBill_.delete.mjs.map
