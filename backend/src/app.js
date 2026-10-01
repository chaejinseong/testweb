import express from "express";

// Express 앱 설정. 서버 시작(index.js)과 분리해서 테스트에서 재사용한다.
export function createApp() {
  const app = express();
  app.use(express.json());

  // 서버가 살아 있는지 확인하는 용도
  app.get("/api/health", (req, res) => {
    res.json({ ok: true });
  });

  return app;
}
