import z from "zod";

const ReceiptResponseSchema = z.object({
  merchantName: z
    .string()
    .describe("The name of the store, business, or merchant"),
  amount: z
    .string()
    .describe(
      "The total payment amount, parsed as a decimal string (e.g. '45.50')",
    ),
  date: z.string().describe("The transaction date in YYYY-MM-DD format"),
});

export default ReceiptResponseSchema;

export const createExpenseSchema = z.object({
  amount: z.number(),
  date: z.string(),
  category: z.string(),
  merchantName: z.string(),
  description: z.string(),
  receiptUrl: z.string(),
  currency: z.string(),
});

export type CreateExpenseSchema = z.infer<typeof createExpenseSchema>;

export const ExpenseStatusEnum = z.enum(["pending", "approved", "rejected"]);
export type ExpenseStatus = z.infer<typeof ExpenseStatusEnum>;

export const updateExpenseStatusSchema = z.object({
  status: ExpenseStatusEnum,
});

export type UpdateExpenseStatusBody = z.infer<typeof updateExpenseStatusSchema>;
export type UpdateExpenseStatus = ExpenseStatus;

export const mapStatus = (status: string) => {
  switch (status.toUpperCase()) {
    case "PENDING":
      return "pending";
    case "APPROVED":
      return "approved";
    case "REJECTED":
      return "rejected";
    default:
      throw new Error(`Invalid status: ${status}`);
  }
};
