/** @format */

const layerRoot = new URL(".", import.meta.url);
const p = (rel: string) => new URL(rel, layerRoot).pathname;

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  css: [p("./app/assets/expense.css"), p("./app/assets/expensedark.css")],
});
