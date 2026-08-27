import { prisma } from "../../../../prisma/utils/prisma";
import {
  mapStatus,
  type UpdateEmployeeSchema,
  type CreateEmployeeSchema,
} from "../schemas";
import type {
  Employee,
  User,
} from "../../../../prisma/generated/prisma/client";

export async function createEmployee(
  employeeInfo: CreateEmployeeSchema,
): Promise<{
  user: User;
  employee: Employee & { profileImage: string };
}> {
  return await prisma.$transaction(async (emp) => {
    const profileImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(employeeInfo.firstName)}+${encodeURIComponent(employeeInfo.lastName)}&background=random&color=fff`;

    // 1. Create the User
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
        profileImage,
        street: employeeInfo.address.street,
        city: employeeInfo.address.city,
        state: employeeInfo.address.state,
        zipCode: employeeInfo.address.zipCode,
      },
    });

    return {
      user,
      employee: {
        ...employee,
        profileImage: employee.profileImage ?? profileImage,
      },
    };
  });
}

export async function getAllEmployee(): Promise<
  (Employee & { user: User; profileImage: string })[]
> {
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
): Promise<{ employee: Employee; user: User }> {
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

    const userRecord = await emp.user.findUnique({
      where: { id: employee.userId },
    });
    if (!userRecord) {
      throw new Error("User not found");
    }

    const userUpdateData: {
      username: string;
      email: string;
      password?: string;
    } = {
      username: employeeInfo.credentials.username,
      email: employeeInfo.credentials.email,
    };

    const hasNewPassword =
      employeeInfo.credentials.newPassword &&
      employeeInfo.credentials.newPassword.trim() !== "";
    const hasOldPassword =
      employeeInfo.credentials.password &&
      employeeInfo.credentials.password.trim() !== "";

    if (hasNewPassword) {
      if (!hasOldPassword) {
        throw new Error("Current password is required to set a new password");
      }

      const isPasswordValid = await verifyPassword(
        userRecord.password,
        employeeInfo.credentials.password!,
      );

      if (!isPasswordValid) {
        throw new Error("Current password is not valid");
      }

      userUpdateData.password = await hashPassword(
        employeeInfo.credentials.newPassword!,
      );
    }

    const user = await emp.user.update({
      where: {
        id: employee.userId,
      },
      data: userUpdateData,
    });

    return { employee, user };
  });
}

export async function deleteEmployee(
  id: string,
): Promise<{ employee: Employee; user: User }> {
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
