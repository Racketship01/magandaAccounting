# Walkthrough - Billing System Fixes

## 1. Fixing Bill Creation Failure

### Root Cause of the Bug

When posting a new bill, the application sent a `POST` request to `/api/createBill`, which is handled by [createBill.post.ts](file:///c:/MagandaTeam-Project/accounting/layers/bill/server/api/createBill.post.ts).

1. It retrieved the user session via `roleSession(event)`, where `adminSession.id` was the `User` model's ID.
2. It then passed this `adminSession.id` (the User ID) directly to the repository method `createBill(result.data, adminSession.id)`.
3. However, in the database schema ([schema.prisma](file:///c:/MagandaTeam-Project/accounting/prisma/schema.prisma)), the `Bill` model's `adminId` field expects the `id` of an `Admin` record, not a `User` record.
4. Because the passed ID did not match a valid `Admin` record, a foreign key constraint violation was triggered in Prisma, causing the server to respond with a `500 Internal Server Error` and preventing the bill from being posted.

### Resolution

We modified [createBill.post.ts](file:///c:/MagandaTeam-Project/accounting/layers/bill/server/api/createBill.post.ts) to:

1. Fetch the actual `Admin` record from the database using the `userId` retrieved from the session:
   ```typescript
   const admin = await prisma.admin.findFirst({
     where: { userId: adminSession.id },
   });
   ```
2. Pass the correct `admin.id` (the Admin model's ID) to the `createBill` repository function:
   ```typescript
   const bill = await createBill(result.data, admin.id);
   ```

---

## 2. Fixing Empty Bill & Employee List on Page Refresh (SSR)

### Root Cause of the Bug

When navigating client-side (CSR) using the sidebar, the browser automatically attaches auth cookies to API requests, so the bills load correctly.

However, when refreshing the page directly (SSR):

1. The initial page request is processed on the Nuxt server side.
2. The server-side `$fetch` to `/api/getBills` (and `/api/getAllEmployee`) is triggered inside the `useAsyncData` hook.
3. In Nuxt 3/4, server-to-server `$fetch` calls do not forward the browser's incoming request headers (such as `cookie` containing the session data) by default.
4. The authentication middleware `/api/getBills` received no session cookie, causing it to return a `403 Forbidden` error.
5. The empty list was then cached by Nuxt and hydrated on the client side, resulting in the bills disappearing from the UI and the dashboard unpaid bills metric dropping to `0`.

- CSR vs SSR Request Context: When navigating client-side (CSR), the browser automatically attaches cookies (containing the auth session) to API calls like /api/getBills. However, on page refresh, the initial page render is performed on the server side (SSR).

- Missing Headers in SSR $fetch: Inside the useAsyncData hook in useBill.ts
  ,Nuxt does a server-to-server $fetch call to load /api/getBills. In Nuxt, server-side $fetch requests do not automatically forward the browser's incoming headers (like the cookie header containing the session) to internal API endpoints.

- Authentication Failure: Due to the missing cookies, the API endpoint received no authentication session and threw a 403 Forbidden error. This empty result was cached during SSR and hydrated onto the client side, causing the bills to disappear from the UI and the dashboard "Unpaid Bills" count to drop to 0.

- Similar Issue in Employee Records: The same issue also affected employee record loading upon page refreshes inside useEmployee.ts
  .

### Resolution

We updated the `useAsyncData` calls in both [useBill.ts](file:///c:/MagandaTeam-Project/accounting/layers/bill/app/composables/useBill.ts) and [useEmployee.ts](file:///c:/MagandaTeam-Project/accounting/layers/profile/app/composables/useEmployee.ts) to forward the cookie headers using the `useRequestHeaders` composable:

```typescript
// useBill.ts
const response = await $fetch<{ bills: Bill[] }>("/api/getBills", {
  headers: useRequestHeaders(["cookie"]),
});

// useEmployee.ts
const response = await $fetch<{ employees: EmployeeData[] }>(
  "/api/getAllEmployee",
  {
    headers: useRequestHeaders(["cookie"]),
  },
);
```

---

## Verification

- **Automated Checks**: Ran `pnpm lint` to ensure that all changes conform to ESLint and type checks. The code compiled successfully with no warnings.
- **Manual Verification**: A browser subagent navigated to the application, logged in as admin, navigated to `/bills`, and verified that:
  - The list of bills loaded correctly.
  - Refreshing the `/bills` page kept the bills loaded.
  - The dashboard metrics (Unpaid Bills, Total Spend, Pending Approval) loaded correctly and remained populated after refreshing `/dashboard`.
