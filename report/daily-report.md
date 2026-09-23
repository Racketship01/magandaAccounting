📋 Daily Progress Report - **Accounting Project**
Date: September 18, 2026 (Friday)

✅ Summary - **Bill Due-Date Reminder Scheduler (Auto Notifications)**
Today's work focused on: Built an automated daily job that scans all unpaid bills every morning at 8:00 AM and pushes a real-time `bill_due` notification to the assigned admin when a bill's due date falls inside its configurable reminder window (3–7 days out). The system reuses the existing push notification + SSE pipeline so reminders appear instantly in the admin's dashboard as a toast and slider entry, and it includes a deduplication guard so the same reminder never fires twice in the same day. A manual trigger endpoint is also available for admins to run the job on-demand.

📐 Task Completed
1️⃣ **Bill Reminder Repository + Scanning Logic** — New `billReminderRepository.ts` in the bill layer exports `runBillDueReminderJob()`. It fetches all unpaid bills where `reminderEnabled = true`, walks through them one-by-one, normalizes `reminderDays` to stay inside the 3–7 day allowed window, and compares today to each bill's `dueDate` (using midnight-anchored dates to avoid drift across timezones / DST). Only bills whose "days until due" exactly equals the configured reminder window qualify.
🔗[billReminderRepository.ts](https://git.next1.ph/imelda/accounting/-/blob/notification/layers/bill/server/repository/billReminderRepository.ts?ref_type=heads)

2️⃣ **Same-Day Deduplication Guard** — Before pushing a notification, the job checks `prisma.notification.findFirst` for any existing `bill_due` row for the same bill + admin created today. If found, it skips (counted in `skippedAlreadyNotified`) so repeated runs never spam the user. This is especially important because the manual API endpoint lets admins run the job any number of times in a day.

3️⃣ **Structured Result Object** — `runBillDueReminderJob` returns a typed `BillDueReminderResult` with counters for `scanned`, `pushed`, `skippedAlreadyNotified`, `skippedPaid`, `skippedDisabled`, `skippedOutOfWindow`, and `errors`. These are passed through both the scheduled task response and the manual API response for easy debugging / observability.
🔗[billReminderRepository.ts](https://git.next1.ph/imelda/accounting/-/blob/notification/layers/bill/server/repository/billReminderRepository.ts?ref_type=heads)

4️⃣ **Nitro Scheduled Task (Daily 8AM Cron)** — Added a Nitro `defineTask` file at `server/tasks/billDueReminder.ts` that wraps the repository call, and registered it in the base `nuxt.config.ts` under `nitro.scheduledTasks` with the cron expression `"0 8 * * *"` (every day at 08:00). Nitro automatically invokes this task on server start in production.
🔗[billDueReminder.ts](https://git.next1.ph/imelda/accounting/-/blob/notification/layers/bill/server/tasks/billDueReminder.ts?ref_type=heads)

5️⃣ **Manual Admin-Only Trigger Endpoint** — Added `POST /api/jobs/billDueReminders` that runs the same `runBillDueReminderJob()` after verifying the caller has admin privileges via `adminSession()`. Returns `{ ok: true, result }` so the admin can see how many reminders were pushed on a manual run without waiting for the next 8AM window.
🔗[billDueReminders.post.ts](https://git.next1.ph/imelda/accounting/-/blob/notification/layers/base/server/api/jobs/billDueReminders.post.ts?ref_type=heads)

6️⃣ **Real-Time Push Works Out of the Box** — Because the reminder calls the existing `pushNotification()` helper (which saves to the DB and emits the SSE event bus), admins get the toast + slider update via the same live WebSocket-style connection used for expense submissions and employee onboarding — no extra plumbing needed.

🚀 Next Steps / Remaining Work
💡 **Allow per-bill custom reminder days via UI** — The repository already reads `bill.reminderDays` and clamps it to 3–7, but there's likely no UI in the bill form for an admin to toggle `reminderEnabled` or pick the number of days. Expose those fields in the bill create/edit form.

💡 **Scale notification bus for multi-instance deploy** — If ever deploying behind a load balancer with multiple app instances, swap the in-memory EventEmitter bus for Redis Pub/Sub so an SSE event fired on one instance reaches subscribers connected to other instances.
