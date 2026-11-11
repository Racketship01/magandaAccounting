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

// How long cached stats are considered fresh before a navigation refetches them.
const CACHE_TTL = 60_000;

export default function useDashboardStats() {
  const statsFetchedAt = useState<number>("dashboardStatsFetchedAt", () => 0);

  // Single source of truth for the dashboard stats, shared across consumers.
  const {
    data,
    status: dashboardStatsStatus,
    refresh: refreshStats,
    error: dashboardStatsError,
  } = useAsyncData<DashboardStats | null>(
    "dashboardStats",
    async () => {
      const response = await $fetch<DashboardStats>("/api/dashboard/getStats", {
        headers: useRequestHeaders(["cookie"]),
      });
      statsFetchedAt.value = Date.now();
      return response ?? null;
    },
    {
      default: () => null,
      dedupe: "cancel",
      // Reuse fresh cache instead of refetching on every mount/navigation.
      getCachedData: (key, nuxtApp) => {
        const cached = nuxtApp.payload.data[key] ?? nuxtApp.static.data[key];
        const isFresh =
          cached && Date.now() - statsFetchedAt.value < CACHE_TTL;
        return isFresh ? cached : undefined;
      },
    },
  );

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

  // True once real (non-default) stats have been resolved at least once.
  const dashboardStatsLoaded = computed(() => data.value !== null);

  return {
    dashboardStats,
    dashboardStatsLoaded,
    dashboardStatsStatus,
    refreshStats,
    dashboardStatsError,
  };
}
