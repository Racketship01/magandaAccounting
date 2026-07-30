export interface Bill {
  id?: string;
  title: string;
  amount: number;
  category: string;
  dueDate: string;
  isRecurring: boolean;
  recurringType?: "monthly" | "quarterly" | "yearly";
  reminderDays: number;
  isPaid: boolean;
  paidDate?: string;
  createdAt: string;
  receiptImage?: string;
  reminderEnabled: boolean;
  currency?: string;
}

export default function useBill() {
  const billFormData = useState<Bill>("formData", () => ({
    title: "",
    amount: 0,
    category: "",
    dueDate: "",
    isRecurring: false,
    recurringType: "monthly",
    reminderDays: 7,
    isPaid: false,
    paidDate: "",
    createdAt: "",
    reminderEnabled: true,
    currency: "USD",
  }));

  const resetForm = () => {
    billFormData.value = {
      title: "",
      amount: 0,
      category: "",
      dueDate: "",
      isRecurring: false,
      recurringType: "monthly",
      reminderDays: 7,
      isPaid: false,
      paidDate: "",
      createdAt: "",
      reminderEnabled: true,
      currency: "USD",
    };
  };

  const bill = useState<Bill | null>("bill", () => null);
  const bills = useState<Bill[]>("bills", () => []);

  const { refresh } = useAsyncData("getBills", async () => {
    try {
      const response = await $fetch<{ bills: Bill[] }>("/api/getBills", {
        headers: useRequestHeaders(["cookie"]),
      });
      if (response?.bills) {
        bills.value = response.bills;
      }
      return response;
    } catch (error) {
      console.error("Failed to load bills:", error);
      return { bills: [] };
    }
  });

  const billState = useState("billState", () => ({
    searchQuery: "",
    selectedCategory: "",
    selectedStatus: "",
  }));

  return {
    bill,
    bills,
    billState,
    refresh,
    billFormData,
    resetForm,
  };
}
