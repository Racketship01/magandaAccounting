import { d as defineEventHandler, l as getNotifications } from '../../_/nitro.mjs';
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

const index_get = defineEventHandler(async (event) => {
  const notifications = await getNotifications(event);
  return { notifications };
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
