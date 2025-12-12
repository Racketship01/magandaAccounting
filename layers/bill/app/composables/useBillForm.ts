interface BillFormData {
  title: string;
  amount: number;
  category: string;
  dueDate: string;
  isRecurring: boolean;
  recurringType: "monthly" | "quarterly" | "yearly";
  reminderDays: number;
  reminderEnabled: boolean;
  currency: string;
}

export default function useBillForm() {
  const formData = useState<BillFormData>("formData", () => ({
    title: "",
    amount: 0,
    category: "",
    dueDate: "",
    isRecurring: false,
    recurringType: "monthly",
    reminderDays: 7,
    reminderEnabled: true,
    currency: "USD",
  }));

  return {
    formData,
  };
}
