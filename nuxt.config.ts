export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  future: {
    compatibilityVersion: 4,
  },
  extends: [
    "./layers/auth",
    "./layers/base",
    "./layers/bill",
    "./layers/expense",
    "./layers/profile",
  ],
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/ui", "nuxt-auth-utils"],
  postcss: {
    plugins: {
      "@tailwindcss/postcss": {},
      autoprefixer: {},
    },
  },

  routeRules: {
    "/": { prerender: true },
  },
});
