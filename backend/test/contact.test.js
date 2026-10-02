import { test, before, after } from "node:test";
import assert from "node:assert/strict";

// .env가 있어도 테스트에서 실제 메일이 나가지 않도록 SMTP 설정을 비운다.
// dotenv는 이미 있는 환경변수를 덮어쓰지 않으므로, 앱을 불러오기 전에 비워 두면 된다.
process.env.SMTP_HOST = "";
const { createApp } = await import("../src/app.js");

let server, url;
before(() => {
  server = createApp().listen(0);
  url = `http://localhost:${server.address().port}/api/contact`;
});
after(() => server.close());

const valid = {
  name: "홍길동",
  contact: "010-1234-5678",
  type: "단체 주문",
  message: "다음 주 금요일 아메리카노 20잔 가능할까요?",
  agree: true,
};

const post = (body) =>
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

test("정상 입력은 200", async () => {
  const res = await post(valid);
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true });
});

test("이메일 연락처도 200", async () => {
  const res = await post({ ...valid, contact: "guest@example.com" });
  assert.equal(res.status, 200);
});

test("필수값 누락은 400과 항목별 이유", async () => {
  const res = await post({ ...valid, name: "  ", message: "", agree: false });
  assert.equal(res.status, 400);
  const { errors } = await res.json();
  assert.deepEqual(Object.keys(errors).sort(), ["agree", "message", "name"]);
});

test("연락처 형식 오류는 400", async () => {
  for (const contact of ["abc", "010-12", "guest@example", "0101234567890"]) {
    const res = await post({ ...valid, contact });
    assert.equal(res.status, 400, contact);
    assert.ok((await res.json()).errors.contact, contact);
  }
});

test("목록에 없는 문의 유형은 400", async () => {
  const res = await post({ ...valid, type: "예약" });
  assert.equal(res.status, 400);
  assert.ok((await res.json()).errors.type);
});

test("길이 초과는 400", async () => {
  const res = await post({ ...valid, name: "가".repeat(51), message: "가".repeat(2001) });
  assert.equal(res.status, 400);
  const { errors } = await res.json();
  assert.ok(errors.name && errors.message);
});
