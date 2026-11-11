📋 Daily Progress Report - **Accounting Project**
Date: October 30, 2026 (Friday)

✅ Summary - **Remote Database Migration (SQLite → PostgreSQL) + Cloud File Uploads (Vercel Blob) + Deployment Prep**

🗄️ **Headline: the app no longer stores its data in a single file on one laptop.** Every record — users, employees, expenses, bills, notifications — now lives in a managed **PostgreSQL** database reached over the internet, instead of a local `dev.db` SQLite file that only existed on the developer's machine. This is the change that makes a real multi-user, multi-device deployment possible: previously, deploying the app to the cloud would have created an _empty, throwaway_ database, or worse, the app would crash on startup because the database file wasn't there. The switch required a full schema rebuild for the new database engine, a new connection layer, and a clean migration history.

☁️ **Second landing: file uploads moved to cloud storage.** Receipt photos and profile avatars used to be written to disk (or embedded as giant base64 strings) on the server itself — a pattern that breaks on serverless hosting, because the server's disk is temporary and each request may hit a different machine. Uploads now go to **Vercel Blob** (managed object storage), returning a permanent public URL. Avatar uploads happen directly from the browser to Blob via a token endpoint, and receipt images are pushed to Blob by the server on expense creation.

🧹 **Third landing: deployment configuration + cleanup.** Added the Vercel build preset, made the build script generate the database client before compiling, added a `db:deploy` command for pushing migrations to the remote database, removed the local database file from version control (and git-ignored it), and deleted the old local-disk upload helper.

🚫 **Notable correctness fix:** when an admin filed an expense that had no employee record attached, the old code silently attached the expense to _the first employee it found in the database_ — mis-attributing someone else's name to that expense. Since expenses no longer require an employee, the code now stores "no employee" honestly instead of picking a random person.

📐 Task Completed
1️⃣ **Database Engine Migrated: SQLite File → Remote PostgreSQL**
• `prisma/schema.prisma` datasource switched from `provider = "sqlite"` to `provider = "postgresql"`.
• `prisma/utils/prisma.ts` rewritten: the SQLite adapter (`PrismaBetterSqlite3`, which resolved a `path.resolve(process.cwd(), "dev.db")` file and logged the DB path on every boot) is gone. It now instantiates `PrismaPg({ connectionString })` from `process.env.DATABASE_URL`, and **fails fast with a clear `"DATABASE_URL is not set"` error** rather than silently pointing at a missing file.
• Dependency swap completed in `package.json` (SQLite adapter + native `better-sqlite3` + its types out; `@prisma/adapter-pg`, `pg`, `@types/pg` in), with `pnpm-lock.yaml` re-synced.
• `prisma/migrations/migration_lock.toml` provider flipped to `postgresql`.
🔗 [schema.ts](https://git.next1.ph/imelda/accounting/-/blob/preDep/prisma/schema.prisma?ref_type=heads)

2️⃣ **Clean Migration History Rebuilt for the New Engine**
• All five SQLite-era migration folders were deleted — they were written in SQLite dialect (e.g. `DATETIME` handling, table-rebuild patterns) and could never replay against Postgres.

3️⃣ **Expense → Employee Link Made Optional (and Silent Mis-Attribution Fixed)**
• In `expenseRepository.createExpense`, an admin filing an expense previously did: use their own employee row if one existed, **otherwise grab `prisma.employee.findFirst()` — literally the first employee row in the database — and file the expense under that unrelated person's name.** That fallback is deleted; the code now assigns `ownEmployee?.id ?? null`, so an admin-owned expense is stored with no employee rather than being attributed to a random colleague.
🔗 [expenseRepository.ts](https://git.next1.ph/imelda/accounting/-/blob/preDep/layers/expense/server/repository/expenseRepository.ts?ref_type=heads)

4️⃣ **Receipt Uploads: Local Disk → Vercel Blob (Server Side)**
• Removed the import of the now-deleted `useUploadImage` composable and its try/catch that, on failure, stored the **entire raw base64 image string** into the database as the "URL".
• Added a local `decodeReceiptImage()` helper that parses the incoming `data:` URL — splitting the header from the payload, extracting the MIME type, base64-decoding into a `Buffer`, and mapping MIME → file extension via an `EXTENSION_BY_MIME` table (jpeg/jpg→jpg, png→png, webp→webp, gif→gif, pdf→pdf) with `png` as the fallback.
• The buffer is uploaded with `put("receipts/receipt_<timestamp>.<ext>", buffer, { access: "public", addRandomSuffix: true })` and the resulting `blob.url` is stored as `receiptUrl` — a durable, CDN-served link instead of a disk path or an inline base64 blob.
🔗 [createExpense.post.ts](https://git.next1.ph/imelda/accounting/-/blob/preDep/layers/expense/server/api/expense/createExpense.post.ts?ref_type=heads)

5️⃣ **Avatar Uploads: Base64 Preview → Direct Browser-to-Blob Upload**
• Two new token endpoints under `layers/base/server/api/blob/upload.post.ts` and `layers/profile/server/api/blob/upload.post.ts` use Vercel's `handleUpload` flow: the browser asks the server for a short-lived upload token, then uploads the file straight to Blob storage (so large files never pass through the app server). Both endpoints call `userSession(event)` first and throw a **401** for unauthenticated callers; the base-layer variant additionally enforces an **`avatars/` path prefix allowlist** so a token cannot be minted for an arbitrary storage path.
• Shared upload constraints: allowed content types limited to `image/jpeg`, `image/png`, `image/webp`, `image/gif`; `maximumSizeInBytes` 5 MB; `addRandomSuffix` enabled to prevent filename collisions/overwrites.
• Deleted `layers/base/app/composables/useUploadImage.ts` — the old helper that took a base64 string and wrote it to the local `public/uploads/` folder.
🔗 [upload.post.ts](https://git.next1.ph/imelda/accounting/-/blob/preDep/layers/base/server/api/blob/upload.post.ts?ref_type=heads)

6️⃣ **Employee & Profile Forms: Real Upload UX**
• Both `EmployeeForm.vue` and `FormEdit.vue` replaced their `FileReader` → base64-preview handlers with `await upload("avatars/<filename>", file, { access: "public", handleUploadUrl: "/api/blob/upload" })`, storing the returned `blob.url` in the form state.

7️⃣ **Deployment Configuration**
• `nuxt.config.ts` now declares `nitro: { preset: "vercel" }`, producing a Vercel-shaped build output.
• `build` and `postinstall` scripts both run `prisma generate` first, so the generated database client exists before Nitro compiles the server routes (without it, any server import of Prisma fails at build time).
• `.gitignore` now excludes local database artifacts (`*.sqlite`, `dev.db`, `prisma/dev.db`) and the tracked `dev.db` file was deleted from the repository, ending the churn of binary DB commits.

8️⃣ **Small UI Adjustments**
• `Login.vue`: the "Don't have an account? Sign up" link block was commented out.
• `Dashboards.vue`: the pending-approval card's empty state text changed from "Nothing to review" to "0".
• `EmployeeForm.vue`: removed a stray `<!-- @format -->` preamble comment above `<script setup>`.

🚀 Next Steps / Remaining Work
💡 **Create `.env.example` and document the required environment variables** — `.gitignore` already whitelists `!.env.example`, but no such file exists in the repo. Deployment currently depends on three undeclared secrets: `DATABASE_URL` (hard-required — `prisma/utils/prisma.ts` throws without it), `REDIS_URL` (optional; enables cross-instance notifications, absent today), and `BLOB_READ_WRITE_TOKEN` (required for Vercel Blob uploads). Add a documented example file so a fresh environment can be configured without reading the source.

💡 **Stop committing `.vercel/output` build artifacts** — The compiled deployment bundle (~48k lines of bundled server/function code plus static assets, including historical receipt test images under `.vercel/output/static/uploads/`) got committed. `.gitignore` covers `.output` but not `.vercel`. Add `.vercel` to `.gitignore`, remove the bundle from tracking, and let the platform build it.

💡 **Run migrations against the real remote database** — `pnpm db:deploy` (`prisma migrate deploy`) has been added but the new Postgres baseline has only been validated locally. Confirm both migrations apply cleanly to the hosted database, and consider running `prisma migrate deploy` as part of the deploy step (the build script currently only runs `prisma generate`).

💡 **Verify uploads end-to-end with a real Blob token** — Both the receipt (`put()` in `createExpense`) and avatar (`handleUpload` token flow) paths were rewritten today. Verify with a live `BLOB_READ_WRITE_TOKEN` that a scanned receipt and an avatar each upload and render from their `blob.url`, and that a >5 MB file is correctly rejected.

💡 **Decide on the commented-out Sign-up link** — `Login.vue`'s "Don't have an account? Sign up" block is currently commented out. If self-signup is intentionally disabled for deployment, the block should be deleted rather than left as dead markup; if it was only hidden for testing, restore it.

💡 **Verify the Redis notification path end-to-end** — Carried over from the previous report. The no-`REDIS_URL` fallback is safe, but the multi-instance path has not been exercised: set `REDIS_URL`, raise a notification on one instance, and confirm it reaches an SSE client connected to another.

💡 **PreDep — Server-Route Permission Audit** — Carried over. Verify every server route carries the correct session guard (`adminSession` vs `userSession` vs none). Priority: `deleteNotification`, `billDueReminders` trigger, `updateBill`, `createEmployeeUser`, `updateExpense`.

💡 **Render New Bill Counters on Dashboard** — Carried over. The dashboard API has returned `paidBillsCount` + `totalBillsCount` since commit `07f95c0`, but `Dashboards.vue` still renders only four KPI cards.
