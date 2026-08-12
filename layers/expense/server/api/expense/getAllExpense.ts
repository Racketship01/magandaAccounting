import { defineEventHandler } from "h3";
import { getExpenses } from "../../repository/expenseRepository";

export default defineEventHandler(async (event) => {
  return getExpenses(event);
});
