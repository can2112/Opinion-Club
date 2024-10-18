// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    // setupFiles: "./test/setup.ts",
    globals: true,
    includeSource: ["src/**/*.{ts,tsx,js,jsx}"],
  },
});