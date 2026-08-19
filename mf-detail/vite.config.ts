import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    federation({
      name: "mfDetail",
      filename: "remoteEntry.js",
      exposes: {
        "./DetailApp": "./src/App.tsx",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  server: { port: 3001, strictPort: true, cors: true },
  preview: { port: 3001, strictPort: true, cors: true },
  build: {
    target: "esnext",
    modulePreload: false,
    minify: false,
    cssCodeSplit: false,
  },
});
