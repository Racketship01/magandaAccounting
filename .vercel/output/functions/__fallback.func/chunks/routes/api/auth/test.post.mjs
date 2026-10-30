import { d as defineEventHandler, r as readBody, e as prisma, c as createError } from '../../../_/nitro.mjs';
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

const test_post = defineEventHandler(async (event) => {
  try {
    const { email, password, username } = await readBody(event);
    console.log("Attempting to create user with email:", email);
    const user = await prisma.user.create({
      data: {
        email,
        password,
        username
      }
    });
    console.log("User created successfully:", user);
    return {
      user
    };
  } catch (error) {
    console.error("Error creating user:", error);
    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create user",
      data: error
    });
  }
});

export { test_post as default };
//# sourceMappingURL=test.post.mjs.map
