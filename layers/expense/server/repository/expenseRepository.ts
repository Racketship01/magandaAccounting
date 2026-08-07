import { prisma } from "~~/prisma/utils/prisma";
import type { Expense } from "~~/prisma/generated/prisma/client";
import userSession from "~~/layers/profile/server/utils/userSession";

export const createExpense = async (
  expense: Omit<
    Expense,
    | "id"
    | "adminId"
    | "employeeId"
    | "createdAt"
    | "updatedAt"
    | "status"
    | "employeeName"
  >,
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

    const fallbackEmployee = await prisma.employee.findFirst();
    employeeId = fallbackEmployee?.id || "";
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
