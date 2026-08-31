📋 Daily Progress Report - **Accounting Project**
Date: August 27, 2026 (Thursday)

✅ Summary - **Implemented Secure User Password Change Feature**
Today's work delivered a complete and secure password change functionality across the entire profile system. Users can now update their passwords safely, with proper current-password verification to prevent unauthorized changes. Additionally, the profile edit form now includes a dedicated Email field and improved password visibility controls.

📐 Task Completed
1️⃣ **Secure Password Change Feature with Current-Password Verification** — Both `profileRepository.ts` (for Admin) and `employeeRepository.ts` (for Employees) now require the current password before accepting a new one. The old password is validated using `verifyPassword()` against the stored hash, and only after it passes is the new password hashed with `hashPassword()` and saved. Invalid or missing current passwords throw clear error messages.
🔗 [profileRepository.ts](https://git.next1.ph/imelda/accounting/-/blob/profile/layers/profile/server/repository/profileRepository.ts)

2️⃣ **UI Overhaul for Profile Edit Form** — `FormEdit.vue` now displays a new dedicated **Email** input field, plus separate **Current Password** and **New Password** fields. Each password field has an eye-icon toggle (show/hide) on the trailing edge, controlled by `showCurrentPassword` / `showNewPassword` refs. Empty `newPassword` values are automatically stripped before submission so users can save profile data without touching their password.
🔗 [FormEdit.vue](https://git.next1.ph/imelda/accounting/-/blob/profile/layers/profile/app/components/FormEdit.vue)

3️⃣ **Schema & Validation Updates** — `schemas.ts` was updated to include the optional `newPassword` field in both `updateProfileSchema` and `updateEmployeeSchema`, giving end-to-end type safety from frontend form through to the database layer. Email validation in the profile schema was also refactored for cleaner formatting.
🔗 [schemas.ts](https://git.next1.ph/imelda/accounting/-/blob/profile/layers/profile/server/schemas.ts)

4️⃣ **Composable & Employee API Alignment** — `useEmployee.ts`, `useProfile.ts`, and `createEmployeeUser.post.ts` received small supporting updates to ensure the new credential fields flow correctly through the entire stack, keeping the Admin and Employee code paths in sync.
🔗 [useProfile.ts](https://git.next1.ph/imelda/accounting/-/blob/profile/layers/profile/app/composables/useProfile.ts)

🚀 Next Steps / Remaining Work
💡 Add a password strength meter or minimum-length rules on the New Password field
💡 Consider optimistic UI refresh after profile save so changes appear instantly (currently uses refresh() refetch)
💡 Add a "Confirm New Password" field to reduce typos
