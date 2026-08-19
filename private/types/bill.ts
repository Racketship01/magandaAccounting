/** @format */

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
  notes?: string;
  receiptImage?: string;
  reminderEnabled: boolean;
}

export interface BillFormData {
  title: string;
  amount: number;
  category: string;
  dueDate: string;
  isRecurring: boolean;
  recurringType: "monthly" | "quarterly" | "yearly";
  reminderDays: number;
  reminderEnabled: boolean;
  notes: string;
  receiptImage: string;
}
