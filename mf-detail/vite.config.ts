import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
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
