import { d as defineEventHandler, c as createError } from '../../_/nitro.mjs';
import { g as getMyProfile } from '../../_/profileRepository.mjs';
import { m as mapPrismaStatus } from '../../_/schemas3.mjs';
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

const getCurrentUser_get = defineEventHandler(async (event) => {
  var _a, _b;
  const currentUser = await getMyProfile(event);
  if (!currentUser) {
    throw createError({
      statusCode: 404,
      statusMessage: "User not found"
    });
  }
  const mappedUser = {
    id: currentUser.id,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    role: currentUser.role,
    phone: currentUser.phone,
    jobTitle: currentUser.jobTitle,
    nationality: currentUser.nationality,
    department: currentUser.department,
    startDate: currentUser.startDate,
    salary: currentUser.salary,
    currency: currentUser.currency,
    status: mapPrismaStatus(currentUser.status),
    address: {
      street: currentUser.street,
      city: currentUser.city,
      state: currentUser.state,
      zipCode: currentUser.zipCode
    },
    credentials: {
      username: (_a = currentUser.user) == null ? void 0 : _a.username,
      email: (_b = currentUser.user) == null ? void 0 : _b.email
    },
    profileImage: currentUser.profileImage
  };
  return { currentUser: mappedUser };
});

export { getCurrentUser_get as default };
//# sourceMappingURL=getCurrentUser.get.mjs.map
