import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 50000,
  },
  resolve: {
    alias: {
      "@api": path.resolve(__dirname, "src/API"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@container": path.resolve(__dirname, "src/container"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@redux": path.resolve(__dirname, "src/redux"),
      "@type": path.resolve(__dirname, "src/type"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@constant": path.resolve(__dirname, "src/constant"),
      "@i18n": path.resolve(__dirname, "src/i18n"),
    },
  },
});
