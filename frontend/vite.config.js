import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// 개발 중 /api 요청은 backend(4000번 포트)로 넘긴다.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: { "/api": "http://localhost:4000" },
  },
});
