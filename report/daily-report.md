📋 Daily Progress Report - **Accounting Project**
Date: September 16, 2026 (Wednesday)

✅ Summary - **Delete Notification Endpoint, Employee Onboarding Notifications & Error Toast Polish**
Today's work focused on: Added the ability for users to permanently delete individual notifications from their list, alongside a new real-time alert that fires whenever a new employee is onboarded. Also filled in the remaining silent error paths across the notification system so fetch failures, stream disconnects, and malformed messages now surface as visible error toasts instead of failing quietly. The server-side event bus was also annotated with inline comments for future maintainability.

📐 Task Completed
1️⃣ **DELETE Notification API Endpoint** — Created a new `DELETE /api/notifications/:id/deleteNotification` route (with its dedicated file in the [id] param folder) that validates the notification ID and removes the row from the database via Prisma. Wired the composable's existing `removeNotification()` stub to actually call this endpoint.
🔗[deleteNotification.delete](https://git.next1.ph/imelda/accounting/-/blob/notification/layers/base/server/api/notifications/[id]/deleteNotification.delete.ts?ref_type=heads)

2️⃣ **Client Delete Flow + Success/Error Feedback** — In `useNotifications.ts`, `removeNotification()` now optimistically removes the notification from the in-app list and adjusts the unread counter first, then calls the DELETE API. On success it shows a green "Notification deleted" confirmation toast; on failure it shows a red error toast so the user knows something went wrong.
🔗[useNotifications.ts](https://git.next1.ph/imelda/accounting/-/blob/notification/layers/base/app/composables/useNotifications.ts?ref_type=heads)

3️⃣ **New-Employee Real-Time Notification Trigger** — After `createEmployeeUser` successfully creates a User + Employee record, it now calls `pushNotification` for the admin with the `employee_joined` type, showing the new hire's name, job title, and department in the admin's notification feed. Because `pushNotification` already emits the SSE event, the admin sees the toast instantly without refreshing.
🔗[createEmployeeUser.post](https://git.next1.ph/imelda/accounting/-/blob/notification/layers/profile/server/api/createEmployeeUser.post.ts?ref_type=heads)

4️⃣ **Silent-Fail Error Toasts Throughout Notifications** — Previously three paths swallowed errors without user feedback: initial `fetchNotifications` failure, malformed JSON in an SSE `onmessage`, and an `onerror` on the EventSource stream. All three now fire a red error toast (matching the existing pattern for mark-as-read failures) so users see when notifications aren't loading or the live stream dropped.
🔗[notificationBus.ts](https://git.next1.ph/imelda/accounting/-/blob/notification/layers/base/server/utils/notificationBus.ts?ref_type=heads)

5️⃣ **NotificationBus Code Comments** — Added inline explanations to `notificationBus.ts` describing the EventEmitter inheritance, the singleton pattern, max-listener setting, per-user event filtering in `subscribe()`, and the unsubscribe closure returned to callers.
🔗[notificationBus.ts](https://git.next1.ph/imelda/accounting/-/blob/notification/layers/base/server/utils/notificationBus.ts?ref_type=heads)

🚀 Next Steps / Remaining Work
💡 **Bill due-date reminder scheduler** — Add a cron job or Nitro scheduled task to automatically create and push `bill_due` notifications 3–7 days before each bill's due date, reusing the same notification + SSE pipeline that's already live.

💡 **Scale notification bus for multi-instance deploy** — The EventEmitter bus is single-process memory. If deploying behind a load balancer with multiple app instances, swap in Redis Pub/Sub (or equivalent) so an event fired on one instance reaches SSE subscribers connected to other instances.
