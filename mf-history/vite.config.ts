import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    federation({
      name: "mfHistory",
      filename: "remoteEntry.js",
      exposes: {
        "./HistoryApp": "./src/App.tsx",
      },
      shared: ["react", "react-dom", "react-router-dom"],
    }),
  ],
  server: { port: 3002, strictPort: true, cors: true },
  preview: { port: 3002, strictPort: true, cors: true },
  build: {
    target: "esnext",
    modulePreload: false,
    minify: false,
    cssCodeSplit: false,
  },
});
