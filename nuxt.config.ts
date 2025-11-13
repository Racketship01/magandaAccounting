/** @format */

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  css: ["~/assets/main.css"],
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  modules: ["@nuxt/ui", "@nuxt/ui-pro", "@nuxt/eslint"],
  postcss: {
    plugins: {
      "@tailwindcss/postcss": {},
      autoprefixer: {},
    },
  },
});