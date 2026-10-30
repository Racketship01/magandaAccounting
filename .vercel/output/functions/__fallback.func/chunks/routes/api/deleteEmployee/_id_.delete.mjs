import { d as defineEventHandler, h as adminSession, j as getRouterParam, c as createError } from '../../../_/nitro.mjs';
import { d as deleteEmployee } from '../../../_/employeeRepository.mjs';
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
import '../../../_/schemas3.mjs';
import 'zod';

const _id__delete = defineEventHandler(async (event) => {
  await adminSession(event);
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing employee ID"
    });
  }
  const employee = await deleteEmployee(id);
  return { employee };
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
