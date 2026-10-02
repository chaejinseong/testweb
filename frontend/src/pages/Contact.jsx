import { useState } from "react";
import { sendContact } from "../api/contact.js";
import store from "../data/store.json";

const TYPES = ["단체 주문", "대관", "기타"];

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | done
  const [result, setResult] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();
    const f = new FormData(e.target);
    setStatus("sending");
    const res = await sendContact({
      name: f.get("name"),
      contact: f.get("contact"),
      type: f.get("type"),
      message: f.get("message"),
      agree: f.get("agree") === "on",
    });
    setResult(res);
    setStatus(res.ok ? "done" : "idle");
  }

  if (status === "done") {
    return (
      <section className="contact-done">
        <h1>접수됐어요</h1>
        <p className="muted">남겨 주신 연락처로 사장님이 직접 연락드릴게요.</p>
      </section>
    );
  }

  const err = result.errors ?? {};
  const fieldError = (name) => err[name] && <p className="field-error">{err[name]}</p>;

  return (
    <>
      <h1>문의하기</h1>
      <p className="muted">
        단체 주문·대관 등 궁금한 점을 남겨 주세요. 급한 문의는 전화 {store.phone}
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          이름
          <input name="name" required maxLength={50} autoComplete="name" />
        </label>
        {fieldError("name")}

        <label>
          연락처
          <input name="contact" required placeholder="전화번호 또는 이메일" autoComplete="tel" />
        </label>
        {fieldError("contact")}

        <fieldset>
          <legend>문의 유형</legend>
          <div className="chips">
            {TYPES.map((t, i) => (
              <label key={t} className="chip-option">
                <input type="radio" name="type" value={t} required={i === 0} />
                <span>{t}</span>
              </label>
            ))}
          </div>
        </fieldset>
        {fieldError("type")}

        <label>
          문의 내용
          <textarea name="message" required maxLength={2000} rows={6} />
        </label>
        {fieldError("message")}

        <label className="agree">
          <input type="checkbox" name="agree" required />
          <span>
            개인정보 수집·이용에 동의합니다. (수집 항목: 이름·연락처, 목적: 문의 답변, 보관: 답변 후 지체 없이 삭제)
          </span>
        </label>
        {fieldError("agree")}

        {result.error && <p className="field-error">{result.error}</p>}

        <button type="submit" className="button" disabled={status === "sending"}>
          {status === "sending" ? "보내는 중…" : "문의 보내기"}
        </button>
      </form>
    </>
  );
}
