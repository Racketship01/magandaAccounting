import { d as defineEventHandler, y as clearUserSession, r as readBody, c as createError, z as hashPassword, q as setUserSession } from '../../../_/nitro.mjs';
import { s as signupSchema } from '../../../_/schemas.mjs';
import { f as findUserByEmail, c as createUser } from '../../../_/userRepository.mjs';
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

const signup_post = defineEventHandler(async (event) => {
  await clearUserSession(event);
  const body = await readBody(event);
  const result = signupSchema.safeParse(body);
  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Validation failed",
      data: result.error.flatten().fieldErrors
    });
  }
  const { username, email, password } = result.data;
  const user = await findUserByEmail(email);
  if (user) {
    throw createError({
      statusCode: 400,
      statusMessage: "User already exists"
    });
  }
  const signup = await createUser(
    username,
    email,
    await hashPassword(password)
  );
  return await setUserSession(event, {
    user: {
      id: signup.id,
      email: signup.email,
      username: signup.username,
      role: "employee"
    },
    loggedInAt: /* @__PURE__ */ new Date()
  });
});

export { signup_post as default };
//# sourceMappingURL=signup.post.mjs.map
