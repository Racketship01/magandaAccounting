import { handleUpload } from '@vercel/blob/client';
import { d as defineEventHandler, a as userSession, c as createError, r as readBody, b as toWebRequest } from '../../../_/nitro.mjs';
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

const ALLOWED_PATH_PREFIXES = ["avatars/"];
const ALLOWED_CONTENT_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif"
];
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const upload_post = defineEventHandler(async (event) => {
  const user = await userSession(event);
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }
  const body = await readBody(event);
  return await handleUpload({
    body,
    request: toWebRequest(event),
    onBeforeGenerateToken: async (pathname) => {
      if (!ALLOWED_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
        throw new Error("Invalid upload path");
      }
      return {
        allowedContentTypes: ALLOWED_CONTENT_TYPES,
        maximumSizeInBytes: MAX_UPLOAD_BYTES,
        addRandomSuffix: true
      };
    }
  });
});

export { upload_post as default };
//# sourceMappingURL=upload.post.mjs.map
