import { Router } from "express";
import { validateContact } from "../validators/contact.js";
import { sendContactMail } from "../services/mail.js";

export const contactRouter = Router();

// POST /api/contact — 입력 확인 → 메일 발송
contactRouter.post("/", async (req, res) => {
  const { data, errors } = validateContact(req.body);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    await sendContactMail(data);
    res.json({ ok: true });
  } catch (err) {
    console.error("문의 메일 발송 실패:", err);
    res.status(500).json({ error: "문의를 보내지 못했어요. 잠시 후 다시 시도하거나 전화로 문의해 주세요." });
  }
});
