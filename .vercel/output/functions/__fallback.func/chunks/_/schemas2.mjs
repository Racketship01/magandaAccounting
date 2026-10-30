import z from 'zod';

const ReceiptResponseSchema = z.object({
  merchantName: z.string().describe("The name of the store, business, or merchant"),
  amount: z.string().describe(
    "The total payment amount, parsed as a decimal string (e.g. '45.50')"
  ),
  date: z.string().describe("The transaction date in YYYY-MM-DD format")
});
z.object({
  amount: z.number(),
  date: z.string(),
  category: z.string(),
  merchantName: z.string(),
  description: z.string(),
  receiptUrl: z.string(),
  currency: z.string()
});
const ExpenseStatusEnum = z.enum(["pending", "approved", "rejected"]);
const updateExpenseStatusSchema = z.object({
  status: ExpenseStatusEnum
});
const mapStatus = (status) => {
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

export { ReceiptResponseSchema as R, mapStatus as m, updateExpenseStatusSchema as u };
//# sourceMappingURL=schemas2.mjs.map
