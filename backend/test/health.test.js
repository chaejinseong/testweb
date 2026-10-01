import { test } from "node:test";
import assert from "node:assert/strict";
import { createApp } from "../src/app.js";

test("GET /api/health 는 200과 ok:true 를 돌려준다", async () => {
  const server = createApp().listen(0);
  const { port } = server.address();
  try {
    const res = await fetch(`http://localhost:${port}/api/health`);
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), { ok: true });
  } finally {
    server.close();
  }
});
