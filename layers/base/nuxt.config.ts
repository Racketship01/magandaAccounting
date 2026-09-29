import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  css: [join(currentDir, "./app/assets/main.css")],
  modules: ["@nuxt/ui", "@nuxt/ui-pro", "@nuxt/eslint"],
  nitro: {
    scheduledTasks: {
      "0 8 * * *": ["billDueReminder"],
    },
  },
});
