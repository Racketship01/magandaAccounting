import { prisma } from "~~/prisma/utils/prisma";
import type { Expense } from "~~/prisma/generated/prisma/client";
import userSession from "~~/layers/profile/server/utils/userSession";
import {
  mapStatus,
  type UpdateExpenseStatus,
  type CreateExpenseSchema,
} from "~~/layers/expense/server/schemas";
import { createError } from "h3";

export const createExpense = async (
  expense: CreateExpenseSchema,
  event: any,
): Promise<Expense> => {
  const {
    amount,
    date,
    category,
    merchantName,
    description,
    receiptUrl,
    currency,
  } = expense;

  const user = await userSession(event);

  let firstName = "";
  let adminId = "";
  let employeeId = "";

  if (user.role === "admin") {
    const admin = await prisma.admin.findFirst({ where: { userId: user.id } });
    if (!admin)
      throw createError({
        statusCode: 404,
        statusMessage: "Admin profile not found",
      });

    adminId = admin.id;
    firstName = admin.firstName;

    const ownEmployee = await prisma.employee.findFirst({
      where: { userId: user.id },
    });
    if (ownEmployee) {
      employeeId = ownEmployee.id;
    } else {
      const fallbackEmployee = await prisma.employee.findFirst();
      employeeId = fallbackEmployee?.id || "";
    }
  } else {
    const employee = await prisma.employee.findFirst({
      where: { userId: user.id },
    });
    if (!employee)
      throw createError({
        statusCode: 404,
        statusMessage: "Employee profile not found",
      });
    employeeId = employee.id;
    firstName = employee.firstName;
    // Find the admin to assign the expense review to
    const defaultAdmin = await prisma.admin.findFirst();
    adminId = defaultAdmin?.id || "";
  }

  return await prisma.expense.create({
    data: {
      amount,
      date,
      category,
      merchantName,
      description,
      receiptUrl, // Saved path (or base64 string)
      status: "pending",
      currency,
      employeeName: firstName,
      adminId,
      employeeId,
    },
  });
};

export async function getExpenses(event: any): Promise<Expense[]> {
  const user = await userSession(event);

  if (user.role === "admin") {
    return await prisma.expense.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        admin: { select: { id: true, firstName: true, lastName: true } },
        employee: { select: { id: true, firstName: true, lastName: true } },
      },
    });
  } else if (user.role === "employee") {
    const employee = await prisma.employee.findFirst({
      where: { userId: user.id },
    });
    if (!employee) {
      return [];
    }
    return await prisma.expense.findMany({
      where: { employeeId: employee.id },
      orderBy: { createdAt: "desc" },
      include: {
        employee: { select: { id: true, firstName: true, lastName: true } },
      },
    });
  } else {
    return [];
  }
}

export async function updateExpenseStatus(
  id: string,
  status: UpdateExpenseStatus,
  event: any,
): Promise<Expense> {
  const user = await userSession(event);

  if (user.role === "employee") {
    throw createError({
      statusCode: 403,
      statusMessage: "Employee cannot update expense status",
    });
  }

  const admin = await prisma.admin.findFirst({
    where: { userId: user.id },
  });

  if (!admin) {
    throw createError({
      statusCode: 403,
      statusMessage: "Admin profile not found",
    });
  }

  return await prisma.expense.update({
    where: { id },
    data: { status: mapStatus(status) },
  });
}

export async function deleteExpense(id: string): Promise<Expense> {
  return await prisma.expense.delete({
    where: { id },
  });
}
