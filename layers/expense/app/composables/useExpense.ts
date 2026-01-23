interface ExpenseItem {
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
  const availableExpenses = useState<ExpenseItem[]>("availableExpenses", () => [
    {
      id: "1",
      date: "2025-01-15",
      category: "Food & Dining",
      amount: 45.5,
      currency: "USD",
      merchantName: "Starbucks",
      description: "Client meeting coffee",
      employeeName: "John Doe",
      status: "Pending",
      receiptUrl: "/mock-receipt-1.jpg",
    },
    {
      id: "2",
      date: "2025-01-14",
      category: "Transportation",
      amount: 25.0,
      currency: "USD",
      merchantName: "Uber",
      description: "Airport pickup",
      employeeName: "Jane Smith",
      status: "Approved",
      receiptUrl: "/mock-receipt-2.jpg",
    },
    {
      id: "3",
      date: "2025-01-13",
      category: "Office Supplies",
      amount: 120.75,
      currency: "USD",
      merchantName: "Office Depot",
      description: "Printer cartridges and paper",
      employeeName: "Mike Johnson",
      status: "Pending",
      receiptUrl: "/mock-receipt-3.jpg",
    },
    {
      id: "4",
      date: "2025-01-12",
      category: "Utilities",
      amount: 89.99,
      currency: "USD",
      merchantName: "Electric Company",
      description: "Monthly office electricity",
      employeeName: "Sarah Wilson",
      status: "Rejected",
      receiptUrl: "/mock-receipt-4.jpg",
    },
    {
      id: "5",
      date: "2025-01-12",
      category: "Healthcare",
      amount: 89.99,
      currency: "USD",
      merchantName: "Doctor",
      description: "Doctor visit",
      employeeName: "Sarah Wilson",
      status: "Approved",
      receiptUrl: "/mock-receipt-4.jpg",
    },
    {
      id: "6",
      date: "2025-01-15",
      category: "Other",
      amount: 45.5,
      currency: "USD",
      merchantName: "Supreme",
      description: "Supreme t-shirt",
      employeeName: "John Doe",
      status: "Pending",
      receiptUrl: "/mock-receipt-1.jpg",
    },
  ]);

  return {
    expenseState,
    availableExpenses,
    selectedExpense,
  };
}
