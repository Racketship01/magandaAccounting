import { d as defineEventHandler, h as adminSession, e as prisma, c as createError } from '../../_/nitro.mjs';
import { g as getBills } from '../../_/billRepository.mjs';
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

const getBills_get = defineEventHandler(async (event) => {
  const user = await adminSession(event);
  const admin = await prisma.admin.findFirst({
    where: { userId: user.id }
  });
  if (!admin) {
    throw createError({
      statusCode: 404,
      statusMessage: "Admin profile not found"
    });
  }
  const bills = await getBills(admin.id);
  return { bills };
});

export { getBills_get as default };
//# sourceMappingURL=getBills.get.mjs.map
