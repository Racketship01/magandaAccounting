import { a as userSession, e as prisma, c as createError, d as defineEventHandler } from '../../../_/nitro.mjs';
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

async function getDashboardStats(event) {
  const user = await userSession(event);
  const profile = await prisma.user.findFirst({
    where: { id: user.id },
    include: {
      admin: true,
      employees: true
    }
  });
  if (!profile) {
    throw createError({
      statusCode: 404,
      statusMessage: "User profile not found"
    });
  }
  let adminId = null;
  let employeeIds = [];
  if (profile.admin && profile.admin.length > 0) {
    adminId = profile.admin[0].id;
  }
  if (profile.employees && profile.employees.length > 0) {
    employeeIds = profile.employees.map((e) => e.id);
  }
  const expenseWhere = {};
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
  const billsWhere = {};
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
      status: true
    }
  });
  const allBills = await prisma.bill.findMany({
    where: billsWhere,
    select: {
      id: true,
      amount: true,
      category: true,
      dueDate: true,
      paidDate: true,
      isPaid: true
    }
  });
  return {
    profile,
    allExpenses,
    allBills
  };
}

const getStats_get = defineEventHandler(async (event) => {
  var _a, _b;
  const { profile, allExpenses, allBills } = await getDashboardStats(event);
  const paidBills = allBills.filter((b) => b.isPaid === true);
  const approvedExpenses = allExpenses.filter(
    (e) => e.status === "approved"
  );
  const allSpends = [...approvedExpenses, ...paidBills];
  const totalSpend = allSpends.reduce(
    (sum, e) => sum + (Number(e.amount) || 0),
    0
  );
  const pendingApprovalCount = allExpenses.filter(
    (e) => e.status === "pending"
  ).length;
  const rejectedExpensesCount = allExpenses.filter(
    (e) => e.status === "rejected"
  ).length;
  const unpaidBillsCount = allBills.filter((b) => !b.isPaid).length;
  const paidBillsCount = allBills.filter((b) => b.isPaid).length;
  const totalBillsCount = allBills.length;
  const categoryMap = /* @__PURE__ */ new Map();
  for (const expense of allExpenses) {
    const key = expense.category || "Uncategorized";
    categoryMap.set(
      key,
      (categoryMap.get(key) || 0) + (Number(expense.amount) || 0)
    );
  }
  for (const bill of paidBills) {
    const key = bill.category || "Uncategorized";
    categoryMap.set(
      key,
      (categoryMap.get(key) || 0) + (Number(bill.amount) || 0)
    );
  }
  const categoryTotals = Array.from(categoryMap.entries()).map(([category, amount]) => ({ category, amount })).sort((a, b) => b.amount - a.amount);
  const yearlyMap = /* @__PURE__ */ new Map();
  for (const expense of allExpenses) {
    try {
      const d = new Date(expense.date);
      const year = d.getFullYear();
      const month = d.getMonth();
      if (!yearlyMap.has(year)) {
        yearlyMap.set(year, /* @__PURE__ */ new Map());
      }
      const yearMap = yearlyMap.get(year);
      yearMap.set(
        month,
        (yearMap.get(month) || 0) + (Number(expense.amount) || 0)
      );
    } catch {
    }
  }
  for (const bill of paidBills) {
    try {
      const dateStr = bill.paidDate || bill.dueDate;
      if (!dateStr) continue;
      const d = new Date(dateStr);
      const year = d.getFullYear();
      const month = d.getMonth();
      if (!yearlyMap.has(year)) {
        yearlyMap.set(year, /* @__PURE__ */ new Map());
      }
      const yearMap = yearlyMap.get(year);
      yearMap.set(
        month,
        (yearMap.get(month) || 0) + (Number(bill.amount) || 0)
      );
    } catch {
    }
  }
  const monthlyExpensesByYear = {};
  const availableYearsSet = /* @__PURE__ */ new Set();
  for (const [year, monthMap] of yearlyMap.entries()) {
    availableYearsSet.add(year);
    monthlyExpensesByYear[year] = Array.from(monthMap.entries()).map(([month, amount]) => ({ month, amount })).sort((a, b) => a.month - b.month);
  }
  const availableYears = Array.from(availableYearsSet).sort((a, b) => b - a);
  const adminRecord = (_a = profile.admin) == null ? void 0 : _a[0];
  const employeeRecord = (_b = profile.employees) == null ? void 0 : _b[0];
  const profileRecord = adminRecord || employeeRecord;
  const accountCreated = (profileRecord == null ? void 0 : profileRecord.createdAt) || profile.createdAt;
  const profileUpdated = (profileRecord == null ? void 0 : profileRecord.updatedAt) || profile.updatedAt;
  return {
    totalSpend,
    pendingApprovalCount,
    rejectedExpensesCount,
    unpaidBillsCount,
    paidBillsCount,
    totalBillsCount,
    categoryTotals,
    monthlyExpensesByYear,
    availableYears,
    userTimestamps: {
      accountCreated: accountCreated.toISOString(),
      profileUpdated: profileUpdated.toISOString(),
      lastLogin: void 0
    }
  };
});

export { getStats_get as default };
//# sourceMappingURL=getStats.get.mjs.map
