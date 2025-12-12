// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  // Your custom configs here
  {
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-explicit-any": "off",
      // relax more noisy rules here
    },
  }
);
