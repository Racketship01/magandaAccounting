import { d as defineEventHandler, j as getRouterParam, c as createError, k as deleteNotification } from '../../../../_/nitro.mjs';
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

const deleteNotification_delete = defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Notification not found"
    });
  }
  return await deleteNotification(id);
});

export { deleteNotification_delete as default };
//# sourceMappingURL=deleteNotification.delete.mjs.map
