📋 Daily Progress Report - **Accounting Project**
Date: September 11, 2026 (Friday)

✅ Summary - **Real-Time Notifications via Server-Sent Events (SSE)**
Today's work focused on: Replaced the old notification polling system (which checked for new updates every 15 seconds) with a live Server-Sent Events connection. Now when someone submits an expense, the admin sees the notification pop up instantly in their dashboard — no waiting and no wasted background checks. The new system uses a lightweight in-memory event bus to broadcast notifications to the right user, paired with a browser-native EventSource connection that automatically reconnects if the network drops.

📐 Task Completed
1️⃣ **Live Notification Event Bus** — Built a singleton server-side event bus (using Node EventEmitter) that broadcasts events per user. When a new notification is saved to the database, the bus emits the event only to the intended recipient's subscriber list, so users only see their own alerts.
🔗 [notificationBus.ts](https://git.next1.ph/imelda/accounting/-/blob/notification/layers/base/server/utils/notificationBus.ts?ref_type=heads)

2️⃣ **SSE Stream Endpoint** — Created a new `/api/notifications/stream` endpoint that establishes a persistent Server-Sent Events connection. Each connection authenticates the user, subscribes to their personal event channel, sends a 15-second heartbeat ping to keep proxies happy, and cleans up (unsubscribe + clear timer) when the client disconnects.
🔗 [stream.get.ts](https://git.next1.ph/imelda/accounting/-/blob/notification/layers/base/server/api/notifications/stream.get.ts?ref_type=heads)

3️⃣ **Client-Side EventSource Integration** — Updated `useNotifications` composable to open a browser `EventSource` connection to the new stream. When a `refresh` message arrives, the client immediately fetches the latest notifications list, triggering the toast pop-up for any newly unread items. Falls back gracefully if EventSource is unavailable.
🔗 [useNotifications.ts](https://git.next1.ph/imelda/accounting/-/blob/notification/layers/base/app/composables/useNotifications.ts?ref_type=heads)

4️⃣ **Notification Hook After DB Save** — Updated `pushNotification()` in the repository layer so that every time a notification row is created in the database, it also fires the event bus emission for that user. The existing expense-submit flow (when an employee submits a new report) now triggers this real-time push to the admin.
🔗 [notificationRepository.ts](https://git.next1.ph/imelda/accounting/-/blob/notification/layers/base/server/repository/notificationRepository.ts?ref_type=heads)

🚀 Next Steps / Remaining Work
💡 **Wire remaining notification triggers** — Hook up `emitNotificationForUser` to other actions that create notifications: expense approve/reject, bill payment, employee onboarding. These write to the DB already but may not be emitting the SSE event yet.

💡 **Bill due-date reminder scheduler** — Add a cron job or Nitro task to automatically create and push `bill_due` notifications 3–7 days before each bill's due date, reusing the same notification pipeline.

💡 **Scale notification bus for multi-instance deploy** — Currently the bus is in-process memory, which works for a single server. If deploying behind a load balancer with multiple instances, swap in Redis Pub/Sub or a similar cross-process channel so an event emitted on one instance reaches subscribers on all instances.
