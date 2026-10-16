📋 Daily Progress Report - **Accounting Project**
Date: October 9, 2026 (Friday)

✅ Summary - **Dashboard Total-Spend Definition: Approved Expenses + Paid Bills (UI Text + Backend Filter) + Side Project Wedding Deployment**
Two small but important corrections to yesterday's "All bills into TotalSpend" release so the KPI number means what the card says:
(1) **Backend**: the `totalSpend` aggregate now takes only **approved** expenses into the sum (`allExpenses.filter(status === "approved")`) rather than every status including pending/rejected — matching accounting's typical "money actually out the door" definition.
(2) **Frontend**: the Total Spend stat-card description was updated from "All expenses combined" → "All expenses and bills combined" so the user reading the card now knows paid bills are included, which aligns the copy with yesterday's data change.
(3) **Branch move**: the `preDep` branch now tracks this + all prior `notification` / `main` work — preparing for a pre-deployment pass (hence "preDep") before the first real-environment rollout.

📐 Task Completed
1️⃣ **Backend: totalSpend Now Sums Only Approved Expenses + Paid Bills**
• Yesterday's `allSpends = [...allExpenses, ...paidBills]` was accidentally summing ALL statuses (pending + rejected + approved) with paid bills, so a newly-submitted $2,000 pending expense was already inflating the Total Spend KPI even though the money hadn't gone out yet.
• Today's correction inserts an intermediate step: `approvedExpenses = allExpenses.filter(e => e.status === "approved")` then `allSpends = [...approvedExpenses, ...paidBills]`.
• The `categoryTotals` and `monthlyExpensesByYear` downstream reduce already consume the same `allExpenses` / `paidBills` inputs (unchanged) — those intentionally include all-statuses so the pie and monthly bars capture holistic trend, which is the correct semantic split: card-Total-Spend = actual spend; charts = holistic portfolio view.
• Net effect: `totalSpend` now matches what a real accounting/finance user would expect from a "Total Spend" headline.
🔗[getStats.get.ts](https://github.com/maganda-team/accounting/blob/preDep/getStats.get.ts)

2️⃣ **Frontend: Total Spend Card Description Now Correctly Mentions Bills**
• In `Dashboards.vue` (inside the `#default` slot of the blue Total Spend UCard, `<p class="stat-card__description">`), text changed from:
"All expenses combined"
→ "All expenses and bills combined"
• Single sentence change but semantically critical: the card no longer under-reports what it aggregates, which closes an integrity gap where a savvy user could add up paid bills on the Bills page and wonder why they didn't show in the dashboard headline.
🔗[Dashboards.vue](https://github.com/maganda-team/accounting/blob/preDep/src/components/Dashboards.vue)

3️⃣ **Side Project: Wedding Deployment**
✅ Deployed the wedding site to a live server
✅ Created Nitro API route`POST /api/rsvp` with server-side validation
✅ Gmail SMTP email sending via Nodemailer (app password whitespace stripping included)
✅ Fixed Nodemailer Nitro bundling bug: switched from direct`await` to callback-wrapped Promise
🔗 https://wedding-website-jm-hgf8.vercel.app/

🚀 Next Steps / Remaining Work
💡 **Render New Bill Counters on Dashboard** — API now returns `paidBillsCount` + `totalBillsCount` since commit `07f95c0`, but the Dashboards.vue KPI grid still only renders 4 cards (Total Spend, Pending Approval, Unpaid Bills, Rejected Expenses [hidden behind `_rejectedExpenses` unused computed]). Next: add Paid Bills + Total Bills tiles, or a 3-column bills mini-grid (Paid / Unpaid / Total) in one row to use the new API surface end-to-end.

💡 **Multi-instance scaling for the notification bus** — If ever deploying behind a load balancer with multiple app instances, swap the in-memory EventEmitter in `notificationBus.ts` for Redis Pub/Sub (or equivalent cross-process pub/sub) so SSE events fired on instance A reach subscribers connected to instance B.
