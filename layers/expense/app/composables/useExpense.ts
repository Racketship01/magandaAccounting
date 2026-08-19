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

  // Mock expense data (individual expenses not yet in a report)
  const availableExpenses = useState<ExpenseItem[]>(
    "availableExpenses",
    () => [],
  );

  const { refresh } = useAsyncData("getExpenses", async () => {
    try {
      const response = await $fetch("/api/expense/getAllExpense", {
        headers: useRequestHeaders(["cookie"]),
      });
      if (response) {
        availableExpenses.value = (response as ExpenseItem[]).map((expense) => {
          let status = expense.status;
          if (status) {
            status =
              status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
          } else {
            status = "Pending";
          }
          return {
            ...expense,
            status,
          };
        });
      }
    } catch (error) {
      console.error("Failed to load expenses:", error);
      return { expenses: [] };
    }
  });
  refresh();

  return {
    expenseState,
    availableExpenses,
    selectedExpense,
    refresh,
  };
}
