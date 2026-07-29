import { z } from "zod";

const billTypeMap = {
  Monthly: "monthly",
  Quarterly: "quarterly",
  Yearly: "yearly",
} as const;

export const createBillSchema = z.object({
  title: z.string(),
  amount: z.number(),
  category: z.string(),
  dueDate: z.string(),
  isRecurring: z.boolean(),
  recurringType: z.string().optional(),
  reminderDays: z.number(),
  isPaid: z.boolean(),
  paidDate: z.string().optional(),
  receiptImage: z.string().optional(),
  reminderEnabled: z.boolean(),
  currency: z.string().optional(),
});

export type CreateBillSchema = z.infer<typeof createBillSchema>;

export const updateBillSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  amount: z.number().optional(),
  category: z.string().optional(),
  dueDate: z.string().optional(),
  isRecurring: z.boolean().optional(),
  recurringType: z.string().optional(),
  reminderDays: z.number().optional(),
  isPaid: z.boolean().optional(),
  paidDate: z.string().optional(),
  receiptImage: z.string().optional(),
  reminderEnabled: z.boolean().optional(),
  currency: z.string().optional(),
});

export type UpdateBillSchema = z.infer<typeof updateBillSchema>;

// Maps UI to Prisma enum
export function mapStatus(billType: CreateBillSchema["recurringType"]) {
  if (!billType) return "monthly";
  const lower = billType.toLowerCase();
  if (lower === "monthly" || lower === "quarterly" || lower === "yearly") {
    return lower as "monthly" | "quarterly" | "yearly";
  }
  return "monthly";
}
