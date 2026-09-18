import { defineEventHandler } from "h3";
import adminSession from "../../../../profile/server/utils/roleSession";
import { runBillDueReminderJob } from "~~/layers/bill/server/repository/billReminderRepository";

export default defineEventHandler(async (event) => {
  await adminSession(event);
  const result = await runBillDueReminderJob();
  return { ok: true, result };
});
