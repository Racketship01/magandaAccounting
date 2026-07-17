import { z } from "zod";

const statusMap = {
  Active: "active",
  Inactive: "inactive",
  "On Leave": "onLeave",
} as const;

export const createEmployeeSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().default(""),
  jobTitle: z.string().min(1, "Job title is required"),
  department: z.string().min(1, "Department is required"),
  startDate: z.string().min(1, "Start date is required"),
  salary: z.number().positive("Salary must be greater than 0"),
  currency: z.string().min(1, "Currency is required"),
  status: z.enum(["Active", "Inactive", "On Leave"]),
  address: z.object({
    street: z.string().default(""),
    city: z.string().default(""),
    state: z.string().default(""),
    zipCode: z.string().default(""),
  }),
  credentials: z.object({
    username: z.string().min(1, "Username is required"),
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  }),
  profileImage: z.string().optional(),
});

export type CreateEmployeeSchema = z.infer<typeof createEmployeeSchema>;

// Maps the UI status string to the Prisma enum value
export function mapStatus(status: CreateEmployeeSchema["status"]) {
  return statusMap[status];
}

const reverseStatusMap = {
  active: "Active",
  inactive: "Inactive",
  onLeave: "On Leave",
} as const;

// Maps the Prisma enum value back to the UI status string
export function mapPrismaStatus(status: keyof typeof reverseStatusMap) {
  return reverseStatusMap[status];
}
