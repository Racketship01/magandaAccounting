import { d as defineEventHandler, r as readBody, c as createError, H as H3Error } from '../../_/nitro.mjs';
import { u as updateMyProfile } from '../../_/profileRepository.mjs';
import { b as updateProfileSchema } from '../../_/schemas3.mjs';
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

const updateProfile_patch = defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing employee information"
    });
  }
  const result = updateProfileSchema.safeParse(body);
  if (!result.success) {
    console.error("Profile update validation failed:", result.error.flatten());
    throw createError({
      statusCode: 400,
      statusMessage: "Validation failed",
      data: result.error.flatten().fieldErrors
    });
  }
  const profileInput = result.data;
  try {
    const profile = await updateMyProfile(event, profileInput);
    if (!profile) {
      throw createError({
        statusCode: 404,
        statusMessage: "Profile not found"
      });
    }
    return { profile };
  } catch (error) {
    console.error("Profile update error:", error);
    if (error instanceof H3Error) throw error;
    throw createError({
      statusCode: 500,
      statusMessage: (error == null ? void 0 : error.message) || "Internal Server Error"
    });
  }
});

export { updateProfile_patch as default };
//# sourceMappingURL=updateProfile.patch.mjs.map
