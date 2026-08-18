import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "shell",
      remotes: {
        mfDetail: "http://localhost:3001/assets/remoteEntry.js",
        mfHistory: "http://localhost:3002/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom", "zustand"],
    }),
  ],
  server: { port: 3000, strictPort: true, cors: true },
  preview: { port: 3000, strictPort: true, cors: true },
  build: {
    target: "esnext",
    modulePreload: false,
    minify: false,
    cssCodeSplit: false,
  },
});
