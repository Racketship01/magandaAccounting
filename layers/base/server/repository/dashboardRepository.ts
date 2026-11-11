import { prisma } from "../../../../prisma/utils/prisma";
import userSession from "../../../auth/server/utils/userSession";

type DashboardProfile = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  admin: { id: string; createdAt: Date; updatedAt: Date }[];
  employees: { id: string; createdAt: Date; updatedAt: Date }[];
};

type DashboardExpense = {
  id: string;
  amount: number;
  category: string;
  date: string;
  status: string;
};

type DashboardBill = {
  id: string;
  amount: number;
  category: string;
  dueDate: string;
  paidDate: string | null;
  isPaid: boolean;
};

export type DashboardSource = {
  profile: DashboardProfile;
  allExpenses: DashboardExpense[];
  allBills: DashboardBill[];
};

export async function getDashboardStats(
  event: H3Event,
): Promise<DashboardSource> {
  const user = await userSession(event);

  const profile = await prisma.user.findFirst({
    where: { id: user.id },
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      admin: { select: { id: true, createdAt: true, updatedAt: true } },
      employees: { select: { id: true, createdAt: true, updatedAt: true } },
    },
  });

  if (!profile) {
    throw createError({
      statusCode: 404,
      statusMessage: "User profile not found",
    });
  }

  let adminId: string | null = null;
  let employeeIds: string[] = [];
  if (profile.admin && profile.admin.length > 0) {
    adminId = profile.admin[0].id;
  }
  if (profile.employees && profile.employees.length > 0) {
    employeeIds = profile.employees.map((e) => e.id);
  }

  const expenseWhere: any = {};
  if (user.role === "admin" && adminId) {
    expenseWhere.adminId = adminId;
  } else if (user.role === "employee") {
    expenseWhere.OR = [];
    if (employeeIds.length > 0) {
      expenseWhere.OR.push({ employeeId: { in: employeeIds } });
    }
    if (adminId) {
      expenseWhere.OR.push({ adminId });
    }
    if (expenseWhere.OR.length === 0) {
      expenseWhere.id = "none";
    }
  }

  const billsWhere: any = {};
  if (user.role === "admin" && adminId) {
    billsWhere.adminId = adminId;
  } else if (user.role === "employee") {
    if (adminId) {
      billsWhere.adminId = adminId;
    } else if (employeeIds.length > 0) {
      billsWhere.id = "none";
    } else {
      billsWhere.id = "none";
    }
  }

  const allExpenses = await prisma.expense.findMany({
    where: expenseWhere,
    select: {
      id: true,
      amount: true,
      category: true,
      date: true,
      status: true,
    },
  });

  const allBills = await prisma.bill.findMany({
    where: billsWhere,
    select: {
      id: true,
      amount: true,
      category: true,
      dueDate: true,
      paidDate: true,
      isPaid: true,
    },
  });

  return {
    profile,
    allExpenses,
    allBills,
  };
}
