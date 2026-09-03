import { defineEventHandler } from "h3";
import type {
  CategoryTotal,
  MonthlyTotal,
  DashboardStats,
} from "../../../app/composables/useDashboardStats";
import { getDashboardStats } from "../../../server/repository/dashboardRepository";

export default defineEventHandler(async (event): Promise<DashboardStats> => {
  const { profile, allExpenses, allBills } = await getDashboardStats(event);

  const totalSpend = allExpenses.reduce(
    (sum: any, e: any) => sum + (e.amount || 0),
    0,
  );

  const pendingApprovalCount = allExpenses.filter(
    (e: any) => e.status === "pending",
  ).length;

  const rejectedExpensesCount = allExpenses.filter(
    (e: any) => e.status === "rejected",
  ).length;

  const unpaidBillsCount = allBills.filter((b: any) => !b.isPaid).length;
  const paidBillsCount = allBills.filter((b: any) => b.isPaid).length;
  const totalBillsCount = allBills.length;

  const categoryMap = new Map<string, number>();
  for (const expense of allExpenses) {
    const key = expense.category || "Uncategorized";
    categoryMap.set(key, (categoryMap.get(key) || 0) + (expense.amount || 0));
  }
  const categoryTotals: CategoryTotal[] = Array.from(categoryMap.entries())
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);

  const yearlyMap = new Map<number, Map<number, number>>();
  for (const expense of allExpenses) {
    try {
      const d = new Date(expense.date);
      const year = d.getFullYear();
      const month = d.getMonth();
      if (!yearlyMap.has(year)) {
        yearlyMap.set(year, new Map<number, number>());
      }
      const yearMap = yearlyMap.get(year)!;
      yearMap.set(month, (yearMap.get(month) || 0) + (expense.amount || 0));
    } catch {
      // skip invalid dates
    }
  }

  const monthlyExpensesByYear: Record<number, MonthlyTotal[]> = {};
  const availableYearsSet = new Set<number>();

  for (const [year, monthMap] of yearlyMap.entries()) {
    availableYearsSet.add(year);
    monthlyExpensesByYear[year] = Array.from(monthMap.entries())
      .map(([month, amount]) => ({ month, amount }))
      .sort((a, b) => a.month - b.month);
  }

  const availableYears = Array.from(availableYearsSet).sort((a, b) => b - a);

  const adminRecord = profile.admin?.[0];
  const employeeRecord = profile.employees?.[0];
  const profileRecord = adminRecord || employeeRecord;

  const accountCreated = profileRecord?.createdAt || profile.createdAt;
  const profileUpdated = profileRecord?.updatedAt || profile.updatedAt;

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
      lastLogin: undefined,
    },
  };
});
