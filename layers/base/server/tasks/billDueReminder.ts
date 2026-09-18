import { defineTask } from "#nitro";
import { runBillDueReminderJob } from "~~/layers/bill/server/repository/billReminderRepository";

export default defineTask({
  meta: {
    name: "billDueReminder",
    description:
      "Send a bill_due notification to the bill's admin when dueDate is reminderDays (3–7) days from today.",
  },
  async run() {
    const result = await runBillDueReminderJob();
    return { ok: true, result };
  },
});
