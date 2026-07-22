import { prisma } from "../../../auth/server/utils/prisma";
import { mapStatus, type UpdateEmployeeSchema } from "../schemas";

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

    const profileImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(employee.firstName)}+${encodeURIComponent(employee.lastName)}&background=random&color=fff`;

    return {
      user,
      employee: {
        ...employee,
        profileImage,
      },
    };
  });
}

export async function getAllEmployee() {
  const employees = await prisma.employee.findMany({
    include: {
      user: true,
    },
  });

  return employees.map((employee) => ({
    ...employee,
    profileImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(employee.firstName)}+${encodeURIComponent(employee.lastName)}&background=random&color=fff`,
  }));
}

export async function updateEmployee(
  id: string,
  employeeInfo: UpdateEmployeeSchema,
) {
  return await prisma.$transaction(async (emp) => {
    const employee = await emp.employee.update({
      where: {
        id: id,
      },
      data: {
        firstName: employeeInfo.firstName,
        lastName: employeeInfo.lastName,
        phone: employeeInfo.phone,
        jobTitle: employeeInfo.jobTitle,
        department: employeeInfo.department,
        startDate: employeeInfo.startDate,
        salary: employeeInfo.salary,
        currency: employeeInfo.currency,
        status: mapStatus(employeeInfo.status),
        street: employeeInfo.address.street,
        city: employeeInfo.address.city,
        state: employeeInfo.address.state,
        zipCode: employeeInfo.address.zipCode,
      },
    });
    if (!employee) {
      throw new Error("Employee not found");
    }

    const user = await emp.user.update({
      where: {
        id: employee.userId,
      },
      data: {
        username: employeeInfo.credentials.username,
        email: employeeInfo.credentials.email,
      },
    });

    return { employee, user };
  });
}

export async function deleteEmployee(id: string) {
  return await prisma.$transaction(async (emp) => {
    const employee = await emp.employee.delete({
      where: {
        id: id,
      },
    });
    if (!employee) {
      throw new Error("Employee not found");
    }

    const user = await emp.user.delete({
      where: {
        id: employee.userId,
      },
    });

    return { employee, user };
  });
}
