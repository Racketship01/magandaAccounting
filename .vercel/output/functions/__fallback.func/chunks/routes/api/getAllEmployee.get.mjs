import { d as defineEventHandler, h as adminSession, c as createError } from '../../_/nitro.mjs';
import { g as getAllEmployee } from '../../_/employeeRepository.mjs';
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

const getAllEmployee_get = defineEventHandler(async (event) => {
  const employees = await getAllEmployee();
  await adminSession(event);
  if (!employees) {
    throw createError({
      statusCode: 404,
      statusMessage: "Employees not found"
    });
  }
  const allEmployees = {
    employees: employees.map((employee) => {
      var _a, _b;
      return {
        id: employee.id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        role: employee.role,
        phone: employee.phone,
        nationality: employee.nationality,
        jobTitle: employee.jobTitle,
        department: employee.department,
        startDate: employee.startDate,
        salary: employee.salary,
        currency: employee.currency,
        status: mapPrismaStatus(employee.status),
        // Map flat DB columns to the nested address object
        address: {
          street: employee.street,
          city: employee.city,
          state: employee.state,
          zipCode: employee.zipCode
        },
        // Map the related User table fields to the credentials object
        credentials: {
          username: (_a = employee.user) == null ? void 0 : _a.username,
          email: (_b = employee.user) == null ? void 0 : _b.email
        },
        profileImage: employee.profileImage
      };
    })
  };
  console.log(allEmployees);
  return { ...allEmployees };
});

export { getAllEmployee_get as default };
//# sourceMappingURL=getAllEmployee.get.mjs.map
