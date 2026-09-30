/** @format */

const layerRoot = new URL(".", import.meta.url);
const p = (rel: string) => new URL(rel, layerRoot).pathname;

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  css: [p("./app/assets/login.css"), p("./app/assets/logindark.css")],
});
