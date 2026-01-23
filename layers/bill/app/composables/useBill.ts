export interface Bill {
  id: string;
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
  const bill = useState<Bill | null>("bill", () => null);
  const bills = useState<Bill[]>("bills", () => [
    {
      id: "1",
      title: "Water Bill - January 2024",
      amount: 85.5,
      category: "water",
      dueDate: "2024-02-15",
      isRecurring: true,
      recurringType: "monthly",
      reminderDays: 7,
      isPaid: false,
      createdAt: "2024-01-15",
      reminderEnabled: true,
      currency: "USD",
    },
    {
      id: "2",
      title: "Electricity Bill - January 2024",
      amount: 125.75,
      category: "electric",
      dueDate: "2024-02-20",
      isRecurring: true,
      recurringType: "monthly",
      reminderDays: 3,
      isPaid: true,
      paidDate: "2024-01-20",
      createdAt: "2024-01-15",
      reminderEnabled: true,
      currency: "USD",
    },
    {
      id: "3",
      title: "Internet Service - February 2024",
      amount: 79.99,
      category: "internet",
      dueDate: "2024-02-25",
      isRecurring: true,
      recurringType: "monthly",
      reminderDays: 7,
      isPaid: false,
      createdAt: "2024-01-15",
      reminderEnabled: true,
      currency: "USD",
    },
    {
      id: "4",
      title: "Rent Payment - February 2024",
      amount: 1200.0,
      category: "rent",
      dueDate: "2024-02-01",
      isRecurring: true,
      recurringType: "monthly",
      reminderDays: 14,
      isPaid: false,
      createdAt: "2024-01-15",
      reminderEnabled: true,
      currency: "USD",
    },
    {
      id: "5",
      title: "Phone Bill - January 2024",
      amount: 65.0,
      category: "phone",
      dueDate: "2024-02-10",
      isRecurring: true,
      recurringType: "monthly",
      reminderDays: 5,
      isPaid: true,
      paidDate: "2024-01-10",
      createdAt: "2024-01-15",
      reminderEnabled: true,
      currency: "USD",
    },
    {
      id: "6",
      title: "Other Bill - January 2024",
      amount: 65.0,
      category: "other",
      dueDate: "2024-02-10",
      isRecurring: false,
      reminderDays: 5,
      isPaid: true,
      paidDate: "2024-01-10",
      createdAt: "2024-01-10",
      reminderEnabled: false,
      currency: "USD",
    },
  ]);

  return {
    bill,
    bills,
  };
}
