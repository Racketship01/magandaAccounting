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

export default function useDashboardStats() {
  const dashboardStats = ref<DashboardStats>({
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
  });

  const { data, refresh: refreshStats } = useAsyncData<DashboardStats | null>(
    "dashboardStats",
    async () => {
      try {
        const response = await $fetch<DashboardStats>(
          "/api/dashboard/getStats",
          {
            headers: useRequestHeaders(["cookie"]),
          },
        );
        return response;
      } catch (error) {
        console.error("Failed to load dashboard stats:", error);
        return null;
      }
    },
  );

  watch(
    data,
    (newData) => {
      if (newData) {
        dashboardStats.value = newData;
      }
    },
    { immediate: true, deep: true },
  );

  return {
    dashboardStats,
    refreshStats,
  };
}
