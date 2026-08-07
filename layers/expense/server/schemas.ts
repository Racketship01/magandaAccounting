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
