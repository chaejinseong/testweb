import nodemailer from "nodemailer";
import { config } from "../config.js";

const { smtp, ownerEmail } = config;
const ready = Boolean(smtp.host && smtp.user && smtp.pass && ownerEmail);

const transport = ready
  ? nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.port === 465,
      auth: { user: smtp.user, pass: smtp.pass },
    })
  : null;

// 문의를 사장님 메일로 보낸다. .env 설정이 없으면 콘솔에만 출력 (개발용 모드).
export async function sendContactMail({ name, contact, type, message }) {
  const body = `이름: ${name}\n연락처: ${contact}\n유형: ${type}\n\n${message}`;

  if (!transport) {
    console.log(`[문의 접수 — 개발용 모드, 메일 미발송]\n${body}\n`);
    return;
  }

  await transport.sendMail({
    from: smtp.user, // 보내는 사람은 항상 우리 계정. 손님 주소는 답장용으로만.
    to: ownerEmail,
    replyTo: contact.includes("@") ? contact : undefined,
    subject: `[느린오후 커피 문의] ${type} — ${name}`,
    text: body,
  });
}
