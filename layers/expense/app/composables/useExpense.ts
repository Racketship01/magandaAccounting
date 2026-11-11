export interface ExpenseItem {
  id: string;
  date: string;
  category: string;
  amount: number;
  currency: string;
  merchantName: string;
  description: string;
  employeeName?: string;
  status: string;
  receiptUrl?: string;
}

// How long a cached list is considered fresh before a navigation refetches it.
const CACHE_TTL = 60_000;

export default function useExpense() {
  const expenseState = useState("expense", () => ({
    searchQuery: "",
    selectedCategory: "",
    selectedEmployee: "",
    selectedStatus: "",
    selectedExpenses: [] as string[],
  }));

  //modal state
  const selectedExpense = useState<ExpenseItem | null>(
    "selectedExpense",
    () => null,
  );

  const expensesFetchedAt = useState<number>("expensesFetchedAt", () => 0);

  // Single source of truth for the expense list, shared across consumers.
  const {
    data: availableExpenses,
    status: expensesStatus,
    error: expensesError,
    refresh,
  } = useAsyncData<ExpenseItem[]>(
    "expenses",
    async () => {
      const response = await $fetch<ExpenseItem[]>(
        "/api/expense/getAllExpense",
        {
          headers: useRequestHeaders(["cookie"]),
        },
      );
      expensesFetchedAt.value = Date.now();
      return (response ?? []).map((expense) => {
        let status = expense.status;
        if (status) {
          status =
            status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
        } else {
          status = "Pending";
        }
        return { ...expense, status };
      });
    },
    {
      default: () => [] as ExpenseItem[],
      dedupe: "cancel",
      // Reuse fresh cache instead of refetching on every mount/navigation.
      getCachedData: (key, nuxtApp) => {
        const cached = nuxtApp.payload.data[key] ?? nuxtApp.static.data[key];
        const isFresh =
          cached && Date.now() - expensesFetchedAt.value < CACHE_TTL;
        return isFresh ? cached : undefined;
      },
    },
  );

  return {
    expenseState,
    availableExpenses,
    expensesStatus,
    expensesError,
    selectedExpense,
    refresh,
  };
}
