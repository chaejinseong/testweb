# 문의 폼 실서비스 전 보완

- Status: open
- Created: 2026-10-02
- Owner: 채진성

## Context

단계 5에서 의도적으로 뺀 것 (report 참고). 연습용으로는 충분하지만 실제 납품 전에 정해야 함.

## What's left

- [ ] `backend/.env` 작성 후 실제 메일 발송 확인 (진성님)
- [ ] 반복 제출(스팸) 막기 — 숨은 입력칸(honeypot) 또는 IP당 횟수 제한 (패키지 추가 시 승인 필요)
- [ ] 개인정보 동의 문구를 실제 가게 기준으로 확정

## Notes

- 개발용 모드: SMTP_HOST·SMTP_USER·SMTP_PASS·OWNER_EMAIL 중 하나라도 비면 콘솔 출력만
