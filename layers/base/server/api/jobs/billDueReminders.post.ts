import { defineEventHandler, getQuery } from "h3";
import adminSession from "../../../../profile/server/utils/roleSession";
import { runBillDueReminderJob } from "../../../../bill/server/repository/billReminderRepository";

export default defineEventHandler(async (event) => {
  await adminSession(event);
  const query = getQuery(event);
  const overrideToday =
    typeof query.today === "string" && query.today.length > 0
      ? query.today
      : undefined;
  const result = await runBillDueReminderJob(overrideToday);
  return {
    ok: true,
    effectiveToday: overrideToday ?? new Date().toISOString().slice(0, 10),
    result,
  };
});
