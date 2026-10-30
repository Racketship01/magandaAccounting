import { d as defineEventHandler, r as readBody, c as createError, v as verifyPassword, q as setUserSession, x as getUserSession } from '../../../_/nitro.mjs';
import { l as loginSchema } from '../../../_/schemas.mjs';
import { f as findUserByEmail } from '../../../_/userRepository.mjs';
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

const login_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const result = loginSchema.safeParse(body);
  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Validation failed",
      data: result.error.flatten().fieldErrors
    });
  }
  const { email, password } = result.data;
  const user = await findUserByEmail(email);
  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: "User not found"
    });
  }
  const isValid = await verifyPassword(user.password, password);
  if (!isValid) {
    throw createError({ statusCode: 401, message: "Invalid credentials" });
  }
  let role;
  if (user.admin && user.admin.length > 0) {
    role = "admin";
  } else if (user.employees && user.employees.length > 0) {
    role = "employee";
  } else {
    throw createError({
      statusCode: 403,
      message: "No role assigned to this user"
    });
  }
  await setUserSession(event, {
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      role
    },
    loggedInAt: /* @__PURE__ */ new Date()
  });
  return await getUserSession(event);
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
