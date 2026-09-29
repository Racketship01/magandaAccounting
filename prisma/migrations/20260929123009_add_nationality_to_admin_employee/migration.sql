/*
  Warnings:

  - Added the required column `nationality` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nationality` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Admin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "salary" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "profileImage" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Admin" ("city", "createdAt", "currency", "department", "firstName", "id", "jobTitle", "lastName", "phone", "profileImage", "role", "salary", "startDate", "state", "status", "street", "updatedAt", "userId", "zipCode") SELECT "city", "createdAt", "currency", "department", "firstName", "id", "jobTitle", "lastName", "phone", "profileImage", "role", "salary", "startDate", "state", "status", "street", "updatedAt", "userId", "zipCode" FROM "Admin";
DROP TABLE "Admin";
ALTER TABLE "new_Admin" RENAME TO "Admin";
CREATE INDEX "Admin_userId_idx" ON "Admin"("userId");
CREATE UNIQUE INDEX "Admin_userId_id_key" ON "Admin"("userId", "id");
CREATE TABLE "new_Employee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "salary" REAL NOT NULL,
    "profileImage" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Employee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Employee" ("city", "createdAt", "currency", "department", "firstName", "id", "jobTitle", "lastName", "phone", "profileImage", "role", "salary", "startDate", "state", "status", "street", "updatedAt", "userId", "zipCode") SELECT "city", "createdAt", "currency", "department", "firstName", "id", "jobTitle", "lastName", "phone", "profileImage", "role", "salary", "startDate", "state", "status", "street", "updatedAt", "userId", "zipCode" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
CREATE INDEX "Employee_userId_idx" ON "Employee"("userId");
CREATE UNIQUE INDEX "Employee_userId_id_key" ON "Employee"("userId", "id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
