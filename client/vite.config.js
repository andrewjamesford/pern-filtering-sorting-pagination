import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    port: 4000,
    host: true,
    strictPort: true,
    hmr: {
      port: 4010,
    },
    watch: {
      usePolling: true,
    },
  },
  plugins: [react()],
});
