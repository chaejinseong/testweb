// 문의를 backend로 보낸다. 성공이면 { ok: true }, 실패면 { errors } 또는 { error }.
export async function sendContact(form) {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    return res.ok ? { ok: true } : data;
  } catch {
    return { error: "서버에 연결하지 못했어요. 잠시 후 다시 시도해 주세요." };
  }
}
