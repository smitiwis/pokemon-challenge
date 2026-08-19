import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const mfDetailUrl =
    env.VITE_MF_DETAIL_URL || "http://localhost:3001/assets/remoteEntry.js";
  const mfHistoryUrl =
    env.VITE_MF_HISTORY_URL || "http://localhost:3002/assets/remoteEntry.js";

  return {
    plugins: [
      tailwindcss(),
      react(),
      federation({
        name: "shell",
        remotes: {
          mfDetail: mfDetailUrl,
          mfHistory: mfHistoryUrl,
        },
        shared: ["react", "react-dom", "react-router-dom"],
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
  };
});
