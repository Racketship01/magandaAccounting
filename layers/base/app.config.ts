import { defineAppConfig } from "nuxt/app";

export default defineAppConfig({
  title: "Accounting App",
  ui: {
    colors: {
      primary: "green",
      secondary: "blue",
      success: "green",
      info: "blue",
      warning: "yellow",
      error: "red",
      neutral: "slate",
    },
    icons: {
      light: "i-ph-sun",
      dark: "i-ph-moon",
    },
  },
});
