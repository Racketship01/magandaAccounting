export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  css: ["./app/assets/main.css"],
  modules: ["@nuxt/ui", "@nuxt/ui-pro", "@nuxt/eslint"],
  nitro: {
    scheduledTasks: {
      "0 8 * * *": ["billDueReminder"],
    },
  },
});
