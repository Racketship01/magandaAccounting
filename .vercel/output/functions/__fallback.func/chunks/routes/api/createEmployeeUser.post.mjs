import { d as defineEventHandler, r as readBody, h as adminSession, c as createError, z as hashPassword, f as pushNotification } from '../../_/nitro.mjs';
import { c as createEmployeeSchema } from '../../_/schemas3.mjs';
import { c as createEmployee } from '../../_/employeeRepository.mjs';
import { a as findUserByUsername, f as findUserByEmail } from '../../_/userRepository.mjs';
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

const createEmployeeUser_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const admin = await adminSession(event);
  const result = createEmployeeSchema.safeParse(body);
  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Validation failed",
      data: result.error.flatten().fieldErrors
    });
  }
  const {
    firstName,
    lastName,
    phone,
    nationality,
    jobTitle,
    department,
    startDate,
    salary,
    currency,
    status,
    address,
    credentials,
    profileImage
  } = result.data;
  console.log(result.data);
  const { username, email, password } = credentials;
  const { street, city, state, zipCode } = address;
  const existingUsername = await findUserByUsername(username);
  if (existingUsername) {
    throw createError({
      statusCode: 409,
      statusMessage: "A user with this username already exists"
    });
  }
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw createError({
      statusCode: 409,
      statusMessage: "A user with this email already exists"
    });
  }
  const hashedPassword = await hashPassword(password);
  const { user, employee } = await createEmployee({
    firstName,
    lastName,
    phone,
    nationality,
    jobTitle,
    department,
    startDate,
    salary,
    currency,
    status,
    address: {
      street,
      city,
      state,
      zipCode
    },
    credentials: {
      username,
      email,
      password: hashedPassword
    }
  });
  await pushNotification({
    userId: admin.id,
    type: "employee_joined",
    title: `${firstName} ${lastName}`,
    description: `Joined \xB7 ${jobTitle}${department ? ` \xB7 ${department}` : ""}`,
    icon: "i-lucide-user-plus"
  });
  return {
    employee: { ...employee },
    user: { ...user }
  };
});

export { createEmployeeUser_post as default };
//# sourceMappingURL=createEmployeeUser.post.mjs.map
