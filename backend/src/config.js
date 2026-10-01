import "dotenv/config";

// 환경변수 읽기. 값은 .env에 진성님이 직접 넣는다 (.env.example 참고).
export const config = {
  port: Number(process.env.PORT) || 4000,
  smtp: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  ownerEmail: process.env.OWNER_EMAIL,
};
