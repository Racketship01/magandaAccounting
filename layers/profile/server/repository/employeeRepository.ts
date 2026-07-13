import { prisma } from "../../../auth/server/utils/prisma";
import { mapStatus } from "../schemas";

type CreateEmployeeInput = {
  firstName: string;
  lastName: string;
  phone: string;
  jobTitle: string;
  department: string;
  startDate: string;
  salary: number;
  currency: string;
  status: "Active" | "Inactive" | "On Leave";
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  credentials: {
    username: string;
    email: string;
    password: string; // must be pre-hashed
  };
};

export async function createEmployee(employeeInfo: CreateEmployeeInput) {
  return await prisma.$transaction(async (emp) => {
    // 1. Create the User (credentials) — must use the transaction client (emp)
    //    so that if employee creation fails, the User is also rolled back.
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
        role: "employee",
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
