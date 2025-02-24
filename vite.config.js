import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sentryVitePlugin({
    org: "jsm-x9",
    project: "javascript-react",
  }), sentryVitePlugin({
    org: "jsm-d2k",
    project: "javascript-react"
  })],
  server: {
    host: "192.168.1.185",
    port: 3000,
  },

  build: {
    sourcemap: true,
  },
});