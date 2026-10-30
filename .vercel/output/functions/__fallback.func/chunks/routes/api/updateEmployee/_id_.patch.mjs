import { d as defineEventHandler, h as adminSession, j as getRouterParam, r as readBody, c as createError, H as H3Error } from '../../../_/nitro.mjs';
import { u as updateEmployee } from '../../../_/employeeRepository.mjs';
import { u as updateEmployeeSchema } from '../../../_/schemas3.mjs';
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

const _id__patch = defineEventHandler(async (event) => {
  await adminSession(event);
  const id = getRouterParam(event, "id");
  const body = await readBody(event);
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing employee ID"
    });
  }
  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing employee information"
    });
  }
  const result = updateEmployeeSchema.safeParse(body);
  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Validation failed",
      data: result.error.flatten().fieldErrors
    });
  }
  try {
    const employee = await updateEmployee(id, result.data);
    if (!employee) {
      throw createError({
        statusCode: 404,
        statusMessage: "Employee not found"
      });
    }
    return { employee };
  } catch (error) {
    if (error instanceof H3Error) throw error;
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error"
    });
  }
});

export { _id__patch as default };
//# sourceMappingURL=_id_.patch.mjs.map
