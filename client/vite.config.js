import MillionLint from '@million/lint';
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const _plugins = [react()];
_plugins.unshift(MillionLint.vite())
export default defineConfig({
  server: {
    port: 4000,
    host: true,
    strictPort: true,
    hmr: {
      port: 4010
    },
    watch: {
      usePolling: true
    }
  },
  plugins: _plugins
});