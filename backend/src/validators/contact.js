export const CONTACT_TYPES = ["단체 주문", "대관", "기타"];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^[0-9-]+$/;

function isContact(value) {
  if (EMAIL.test(value)) return true;
  const digits = value.replaceAll("-", "");
  return PHONE.test(value) && digits.length >= 9 && digits.length <= 11;
}

// 문의 입력값 확인. 틀린 항목만 { 항목: 이유 } 로 돌려준다 (비어 있으면 통과).
export function validateContact(body) {
  const text = (v) => (typeof v === "string" ? v.trim() : "");
  const data = {
    name: text(body?.name),
    contact: text(body?.contact),
    type: text(body?.type),
    message: text(body?.message),
    agree: body?.agree === true,
  };
  const errors = {};

  if (!data.name) errors.name = "이름을 입력해 주세요.";
  else if (data.name.length > 50) errors.name = "이름은 50자 이내로 입력해 주세요.";

  if (!data.contact) errors.contact = "연락처를 입력해 주세요.";
  else if (!isContact(data.contact)) errors.contact = "전화번호 또는 이메일 형식을 확인해 주세요.";

  if (!CONTACT_TYPES.includes(data.type)) errors.type = "문의 유형을 선택해 주세요.";

  if (!data.message) errors.message = "문의 내용을 입력해 주세요.";
  else if (data.message.length > 2000) errors.message = "문의 내용은 2000자 이내로 입력해 주세요.";

  if (!data.agree) errors.agree = "개인정보 수집·이용에 동의해 주세요.";

  return { data, errors };
}
