import { defineEventHandler, createError } from "h3";
import { getAllEmployee } from "../repository/employeeRepository";
import { mapPrismaStatus } from "../schemas";

export default defineEventHandler(async () => {
  const employees = await getAllEmployee();

  if (!employees) {
    throw createError({
      statusCode: 404,
      statusMessage: "Employees not found",
    });
  }

  const allEmployees = {
    employees: employees.map((employee: any) => ({
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      role: employee.role,
      phone: employee.phone,
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
        zipCode: employee.zipCode,
      },
      // Map the related User table fields to the credentials object
      credentials: {
        username: employee.user?.username,
        email: employee.user?.email,
      },
      profileImage: employee.profileImage,
    })),
  };

  console.log(allEmployees);

  return { ...allEmployees };
});
