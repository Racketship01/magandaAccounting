export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxt/ui",
    "nuxt-auth-utils",
    "@nuxt/ui-pro",
    "vite-tsconfig-paths",
  ],
  postcss: {
    plugins: {
      "@tailwindcss/postcss": {},
      autoprefixer: {},
    },
  },
  extends: [
    "./layers/base",
    "./layers/auth",
    "./layers/bill",
    "./layers/expense",
    "./layers/profile",
  ],
});
