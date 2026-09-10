📋 Daily Progress Report - **Accounting Project**
Date: September 9, 2026 (Wednesday)

✅ Summary - **In-App Push Notification System & Dashboard Error Handling**
Today's work focused on: Implemented a comprehensive in-app push notification system with full database schema, API endpoints, UI slider, and auto-triggering notifications for bill/expense lifecycle events. Additionally, completed the dashboard data loading error notifications were also wired up with global toast pop-ups for better user feedback when API failures.

📐 Task Completed
1️⃣ **Database Schema for Notifications** — Added the `Notification` Prisma model with fields for recipient (userId), type (EXPENSE_SUBMITTED, EXPENSE_APPROVED, EXPENSE_REJECTED, BILL_CREATED, BILL_UPDATED, BILL_PAID), read status, title, message, and related entity IDs. Generated and applied the corresponding database migration.
🔗 [prisma schema](https://git.next1.ph/imelda/accounting/-/blob/notification/prisma/schema.prisma?ref_type=heads)

2️⃣ **Notification API Endpoints** — Built three new server API routes:

- `GET /api/notifications` — Fetch all notifications for the current user
  🔗[index.get.ts](https://git.next1.ph/imelda/accounting/-/blob/notification/layers/base/server/api/notifications/index.get.ts?ref_type=heads)
- `POST /api/notifications/read-all` — Mark all notifications as read
  🔗[read-all.post.ts](https://git.next1.ph/imelda/accounting/-/blob/notification/layers/base/server/api/notifications/read-all.post.ts?ref_type=heads)
- `POST /api/notifications/:id/read` — Mark a single notification as read
  🔗[read.post.ts](https://git.next1.ph/imelda/accounting/-/blob/notification/layers/base/server/api/notifications/[id]/read.post.ts?ref_type=heads)

3️⃣ **Notification Repository & Utility** — Created `notificationRepository.ts` for database operations and `notification.ts` utility for the shared `createNotification()` helper used across modules.
🔗 [notificationRepository.ts](https://git.next1.ph/imelda/accounting/-/blob/notification/layers/base/server/repository/notificationRepository.ts?ref_type=heads)
🔗 [notification.ts](https://git.next1.ph/imelda/accounting/-/blob/notification/layers/base/server/utils/notification.ts?ref_type=heads)

4️⃣ **UI: Notification Slider Component** — Enhanced `NotificationSlider.vue` with a bell icon badge showing unread count, slide-in drawer listing notifications grouped by read/unread, click-to-read, and a "Mark All as Read" action. Updated `PageCard.vue` and `default.vue` layout to integrate the notification bell in the header.
🔗 [NotificationSlider.vue](https://git.next1.ph/imelda/accounting/-/blob/notification/layers/base/app/components/NotificationSlider.vue?ref_type=heads)

5️⃣ **Auto-Triggered Notifications on Bill & Expense Events** — Wired notification creation into the bill and expense lifecycle: create/submit, approve/reject, update, and paid status changes trigger appropriate notifications for the relevant users (submitter, approvers, admins).

6️⃣ **Dashboard Data Loading Error Pop-ups** — Updated `useDashboardStats.ts` to properly expose the `error` state from `useAsyncData` with error re-throwing. Added a watcher in `Dashboard.vue` that triggers global error toasts (red-colored, consistent with existing error patterns in `ExpenseView.vue`) when dashboard stats fail to load on initial mount and on user-role refresh cycles.

🚀 Next Steps / Remaining Work
💡 Swap short-polling → SSE or Nuxt 4 crossws WebSocket by replacing just the startPolling internals inside useNotifications.ts — everything else (types, triggers, UI) stays identical.
💡 Add click-to-navigate: when user clicks a card with expenseId/billId, router-push to the entity page.
💡 Add a scheduled cron for bill_due reminders X days before dueDate using the same pushNotification.
