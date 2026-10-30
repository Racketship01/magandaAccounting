import { d as defineEventHandler, m as markReadNotification } from '../../../../_/nitro.mjs';
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

const read_post = defineEventHandler(async (event) => {
  const success = await markReadNotification(event);
  return { success };
});

export { read_post as default };
//# sourceMappingURL=read.post.mjs.map
