export type CategoryTotal = { category: string; amount: number };
export type MonthlyTotal = { month: number; amount: number };
export type DashboardStats = {
  totalSpend: number;
  pendingApprovalCount: number;
  rejectedExpensesCount: number;
  unpaidBillsCount: number;
  paidBillsCount: number;
  totalBillsCount: number;
  categoryTotals: CategoryTotal[];
  monthlyExpensesByYear: Record<number, MonthlyTotal[]>;
  availableYears: number[];
  userTimestamps: {
    accountCreated: string;
    profileUpdated: string;
    lastLogin?: string;
  };
};

const defaultStats: DashboardStats = {
  totalSpend: 0,
  pendingApprovalCount: 0,
  rejectedExpensesCount: 0,
  unpaidBillsCount: 0,
  paidBillsCount: 0,
  totalBillsCount: 0,
  categoryTotals: [],
  monthlyExpensesByYear: {},
  availableYears: [],
  userTimestamps: {
    accountCreated: "",
    profileUpdated: "",
  },
};

export default function useDashboardStats() {
  const {
    data,
    refresh: refreshStats,
    error: dashboardStatsError,
  } = useAsyncData<DashboardStats | null>("dashboardStats", async () => {
    try {
      const response = await $fetch<DashboardStats>("/api/dashboard/getStats", {
        headers: useRequestHeaders(["cookie"]),
      });
      return response;
    } catch (error) {
      console.error("Failed to load dashboard stats:", error);
      throw error;
    }
  });

  const dashboardStats = computed<DashboardStats>(() => {
    const resolved = data.value;
    if (!resolved) return defaultStats;
    return {
      ...defaultStats,
      ...resolved,
      userTimestamps: {
        ...defaultStats.userTimestamps,
        ...resolved.userTimestamps,
      },
    };
  });

  return {
    dashboardStats,
    refreshStats,
    dashboardStatsError,
  };
}
