import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, type PluginOption } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  // pnpm can surface duplicate Vite types (same runtime), causing plugin type mismatches in TS.
  plugins: [react(), tailwindcss(), tsconfigPaths()] as unknown as PluginOption[],
  resolve: {
    dedupe: ["react", "react-dom"],
  },
});
