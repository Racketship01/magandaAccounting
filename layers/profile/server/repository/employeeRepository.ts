import { prisma } from "../../../auth/server/utils/prisma";
import type { EmployeeData } from "../../app/composables/useEmployee";
import { mapStatus } from "../schemas";

// type CreateEmployeeInput = {
//   // Credentials (User record)
//   username: string;
//   email: string;
//   hashedPassword: string;

//   // Employee record
//   firstName: string;
//   lastName: string;
//   phone: string;
//   jobTitle: string;
//   department: string;
//   startDate: string;
//   salary: number;
//   currency: string;
//   status: "active" | "inactive" | "onLeave";
//   street: string;
//   city: string;
//   state: string;
//   zipCode: string;
// };

export async function createEmployee(employeeInfo: EmployeeData) {
  return await prisma.$transaction(async (emp) => {
    // 1. Create the User (credentials)
    const user = await emp.user.create({
      data: {
        username: employeeInfo.credentials.username,
        email: employeeInfo.credentials.email,
        password: employeeInfo.credentials.password,
      },
    });

    // 2. Create the Employee linked to that User
    const employee = await emp.employee.create({
      data: {
        userId: user.id,
        firstName: employeeInfo.firstName,
        lastName: employeeInfo.lastName,
        phone: employeeInfo.phone,
        jobTitle: employeeInfo.jobTitle,
        department: employeeInfo.department,
        startDate: employeeInfo.startDate,
        salary: employeeInfo.salary,
        currency: employeeInfo.currency,
        role: "user",
        status: mapStatus(employeeInfo.status),
        street: employeeInfo.address.street,
        city: employeeInfo.address.city,
        state: employeeInfo.address.state,
        zipCode: employeeInfo.address.zipCode,
      },
    });

    return { user, employee };
  });
}
