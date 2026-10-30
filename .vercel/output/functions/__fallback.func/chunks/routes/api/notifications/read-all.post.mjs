import { d as defineEventHandler, n as markReadAllNotifications } from '../../../_/nitro.mjs';
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

const readAll_post = defineEventHandler(async (event) => {
  const success = await markReadAllNotifications(event);
  return { success };
});

export { readAll_post as default };
//# sourceMappingURL=read-all.post.mjs.map
