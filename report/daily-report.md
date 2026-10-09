📋 Daily Progress Report - **Accounting Project**
Date: October 8, 2026 (Thursday)

✅ Summary - **Notification Toast Dedupe + SSE Error Guard (committed) + Dashboard Total-Spend Now Includes Paid Bills + New Bill Counter Stats**
Today's work focused on:
Two landings:
(1) **Notification UX cleanup** from Oct 4 — previously unstaged — was formally committed under `fe0126e`. Now: per-browser `localStorage` LRU set (200-ID cap) deduplicates toast firing across navigations, and a `streamErrorShown` flag with onmessage-clear rate-limits SSE reconnect errors to one per cycle.
(2) **Dashboard rewrite** — dashboard KPI `totalSpend` and both dashboard charts (category pie + monthly bars) now aggregate **paid bills AND expenses together** (previously only expenses). The dashboard API also exposes three new bill-related KPI counters (`paidBillsCount`, `totalBillsCount`, `unpaidBillsCount` already existed). Also in 07f95c0: a new `getDashboardStats` repository helper centralizes the `User → Admin/Employee → Expense + Bill` scope resolution (so employees see their own expenses only, admins see their org's), removed two stray `<!-- @format -->` preamble comments in profile components, and re-seeded `dev.db` (+~350KB). Notification branch work is now merged into `main`; git status reports working tree clean on `main`.

📐 Task Completed
1️⃣ **Repository Helper: dashboardRepository.getDashboardStats** — New central repository layer. Resolves the current user from session → loads the User row with Admin + Employee includes → builds per-role where-clauses:
• **Admin role**: `expenseWhere.adminId = adminId`; `billsWhere.adminId = adminId`. Sees whole org.
• **Employee role**: expenses restricted to `{employeeId in employeeIds} OR {adminId}` (their own submissions plus any admin-owned ones they're attached to); bills restricted by matching adminId. If no matching IDs → where sentinel `id = "none"` to return zero rows (safe, never all-org).
Returns `{profile, allExpenses, allBills}`. Previously the scope logic lived ad-hoc in the API handler; now it's in a typed server/repository file.
🔗[dashboardRepository](https://git.next1.ph/imelda/accounting/-/blob/main/layers/base/server/repository/dashboardRepository.ts?ref_type=heads)

2️⃣ **getStats API: totalSpend Now = Expenses + Paid Bills, 3 New Counters** — `layers/base/server/api/dashboard/getStats.get.ts` was rewritten:
• Destructures `allBills` in addition to `allExpenses` and `profile` from the repo helper.
• `paidBills = allBills.filter(b => b.isPaid === true)`.
• `allSpends = [...allExpenses, ...paidBills]` → feeds the `totalSpend` reduce.
• **New KPI counters** (already-plumbed through the typed DashboardStats return): `paidBillsCount`, `totalBillsCount`, plus `unpaidBillsCount` now has a matching pair to show on dashboard cards.
• **Category totals** loops twice: once on allExpenses, once on paidBills, accumulating into the same `categoryMap`. Previously the pie chart only showed expenses; now paid-bill spend is a required additive row under the bill's `category || "Uncategorized"` key.
• **Monthly totals** loops twice, bills branch uses `paidDate || dueDate` (both fallbacks — no paidDate = fall back to due so unpaid bills don't leak into the chart accidentally, but only `paidBills` are in the loop). Each monthly set is added to the same yearlyMap[year][month] bucket so both series sum on top of each other in the dashboard's grouped bar.
🔗[getStats.get.ts](https://git.next1.ph/imelda/accounting/-/blob/main/layers/base/server/api/dashboard/getStats.get.ts?ref_type=heads)

3️⃣ **Pre-Flight Date-Parse Try/Catch Guards on both aggregate loops** — The per-expense and per-bill date segments now wrap `new Date(expense.date)` / `new Date(bill.paidDate || bill.dueDate)` each in their own `try {} catch { // skip invalid dates }`. Any row where date parsing throws NaN / invalid date simply doesn't contribute to the yearlyMap → doesn't skew the bar chart with 1970 buckets.

🚀 Next Steps / Remaining Work
💡 **Render New Bill Counters on DashTest/Dashboard** — The API now returns `paidBillsCount` and `totalBillsCount` in the stats payload. DashTest.vue currently only renders four KPI cards (totalSpend, pendingApprovalCount, unpaidBillsCount, rejectedExpensesCount). Next: add the two new KPI tiles, either as two more cards or a bills-mini-card grid showing paid / unpaid / total in a single row.

💡 **Multi-instance scaling for the notification bus** — If ever deploying behind a load balancer with multiple app instances, swap the in-memory EventEmitter in `notificationBus.ts` for Redis Pub/Sub (or equivalent cross-process pub/sub) so SSE events fired on instance A reach subscribers connected to instance B.
