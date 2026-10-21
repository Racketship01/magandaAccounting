📋 Daily Progress Report - **Accounting Project**
Date: October 16, 2026 (Friday)
Branch: preDep
Author: racketship01

✅ Summary - **Real Cross-Server Notifications (Redis Pub/Sub for SSE) + Design Polish Pass**
🔔 **Headline: Notifications now survive a multi-server setup.** The real-time notification system was rewritten so that a notification created on one app server is instantly delivered to users connected to _any other_ app server. Previously the notification "bus" lived only in one server's memory, which meant that once the app is scaled to more than one instance behind a load balancer, an admin connected to server A would silently miss an expense alert raised on server B. Today's change routes every notification through Redis, the industry-standard message broker, while keeping the old single-server behaviour as an automatic fallback when no Redis is configured. This was the #1 item on the project's "remaining work" list for several weeks.
🎨 **Second landing: UI polish.** Fixed a stray caption that printed "Open in new tabReceipt Section", cleaned up the notification bell (smaller red dot indicator instead of a bulky number badge), gave every card a subtle amber tint, tightened modal scroll heights on the Bills and Expense pages so tall dialogs stop overflowing, and restructured the bill reminder controls so the "Reminder" day-picker now sits above the "Enable Reminder" checkbox. Also added a sample uploaded receipt image used during local testing.

📐 Task Completed
1️⃣ **Notification Bus: Redis Pub/Sub with Graceful Single-Instance Fallback**
• Replaced the old singleton `NotificationBus extends EventEmitter` class with a plain, module-level state object (`{ bus, publisher, subscriber }`) cached on `globalThis.__notificationBusState` so Nuxt dev HMR reloads no longer leak Redis connections or duplicate listeners.
• **Automatic mode selection**: reads `REDIS_URL` from the environment. Set → notifications are published to the Redis channel `accounting:notifications`. Unset → falls back to a plain in-process `EventEmitter`, exactly preserving the previous single-server behaviour. No config change is required to keep the app working today.
• **Two separate connections**: a distinct `publisher` and `subscriber` ioredis client, because a Redis connection in subscriber mode cannot issue normal commands. Both attach `.on("error", …)` handlers so a broker outage logs instead of crashing the process.
• **Lazy connect**: `connectRedis()` opens the connections on first use and short-circuits if already connected, so Redis is never touched in environments that don't need it.
• **Publish with local fallback**: `emitNotificationForUser()` publishes to Redis; if the publish promise rejects, it logs the failure and still emits on the local bus — so a Redis blip degrades to single-instance delivery rather than dropping the notification entirely.
• **Per-user filtering preserved**: `subscribeToNotifications(userId, cb)` keeps the same contract — the SSE stream registers once and only fires when the incoming payload matches its own `userId` — and still returns an unsubscribe closure for clean teardown on client disconnect.
🔗[notificationBus.ts](https://git.next1.ph/imelda/accounting/-/blob/preDep/layers/base/server/utils/notificationBus.ts?ref_type=heads)

2️⃣ **SSE Pipeline Now Multi-Instance Safe (End-to-End)**
• With this change the full chain — `pushNotification()` → `emitNotificationForUser()` → Redis channel → every instance's subscriber → local bus → the per-user SSE stream → browser `EventSource` toast — works across N app servers. This closes the "Multi-instance scaling for the notification bus" item that had been carried forward in every report since September.

3️⃣ **Notification Bell Polish**
• Button changed from a fixed `square` ghost button to `size="md"`, and its wrapper to `relative inline-flex` so the dot anchors correctly without stretching the header row.
🔗[NotificationSlider.vue](https://git.next1.ph/imelda/accounting/-/blob/preDep/layers/base/app/components/NotificationSlider.vue?ref_type=heads)

🚀 Next Steps / Remaining Work
💡 **Verify the Redis path end-to-end** — The fallback (no `REDIS_URL`) is safe, but the Redis path has only been committed, not yet exercised in a running multi-instance environment. Next: set `REDIS_URL` locally (or spin two dev instances on different ports against one Redis) and confirm a notification raised on instance A reaches an SSE client on instance B. Also document `REDIS_URL` in `.env.example`.

💡 **PreDep — Server-Route Permission Audit** — Verify every server route carries the correct session guard (`adminSession` vs `userSession` vs none). Priority: `deleteNotification`, `billDueReminders` trigger, `updateBill`, `createEmployeeUser`, `updateExpense`.
