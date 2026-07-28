// server/types/auth.d.ts  (or any .d.ts in your project)
declare module "#auth-utils" {
  interface UserSession {
    user: {
      id: string;
      email: string;
      username: string;
      role?: "admin" | "employee";
    };
    loggedInAt: Date;
  }
}

export {};
