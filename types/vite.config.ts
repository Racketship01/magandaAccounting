/** @format */

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import uiPro from "@nuxt/ui-pro/vite";

export default defineConfig({
  plugins: [
    vue(),
    uiPro({
      ui: {
        modal: {
          slots: {
            overlay: "fixed inset-0 bg-elevated/75",
            content:
              "fixed bg-default divide-y divide-default flex flex-col focus:outline-none",
            header: "flex items-center gap-1.5 p-4 sm:px-6 min-h-16",
            wrapper: "",
            body: "flex-1 overflow-y-auto p-4 sm:p-6",
            footer: "flex items-center gap-1.5 p-4 sm:px-6",
            title: "text-highlighted font-semibold",
            description: "mt-1 text-muted text-sm",
            close: "absolute top-4 end-4",
          },
          variants: {
            transition: {
              true: {
                overlay:
                  "data-[state=open]:animate-[fade-in_200ms_ease-out] data-[state=closed]:animate-[fade-out_200ms_ease-in]",
                content:
                  "data-[state=open]:animate-[scale-in_200ms_ease-out] data-[state=closed]:animate-[scale-out_200ms_ease-in]",
              },
            },
            fullscreen: {
              true: {
                content: "inset-0",
              },
              false: {
                content:
                  "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-2rem)] max-w-lg max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-4rem)] rounded-lg shadow-lg ring ring-default overflow-hidden",
              },
            },
          },
        },
      },
    }),
  ],
});

// <style scoped>
// .animated-gradient-border {
//   position: relative;
//   padding: 3px;
//   border-radius: 0.5rem;
//   background: linear-gradient(
//     90deg,
//     #ef4444,
//     #f97316,
//     #eab308,
//     #22c55e,
//     #3b82f6,
//     #8b5cf6,
//     #ec4899,
//     #ef4444
//   );
//   background-size: 400% 400%;
//   animation: gradient-shift 3s ease infinite;
// }

// @keyframes gradient-shift {
//   0% {
//     background-position: 0% 50%;
//   }
//   50% {
//     background-position: 100% 50%;
//   }
//   100% {
//     background-position: 0% 50%;
//   }
// }

// .animated-gradient-border :deep(> *) {
//   border-radius: calc(0.5rem - 3px);
//   background: white;
// }

// /* Dark mode support */
// .dark .animated-gradient-border :deep(> *) {
//   background: #1f2937;
// }
// </style>
