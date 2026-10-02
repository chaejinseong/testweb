# Technical Specs & Constraints

> Fill in per project. This is the "how" — stack, exact commands, and
> implementation rules an agent must respect. Boundaries and verification
> defaults already live in `AGENTS.md`; only repeat them here if this
> project needs to override them.

## Stack

- Language / framework: React, Node.js (2026-10-01 결정)
- Database: 없음 (소개형, 데이터 저장 기능 없음)
- Runtime: Node.js 22 (작업 환경 v22.22.2)
- Key libraries (2026-10-01 설치 기준):
  - frontend: react / react-dom ^19.3.0, react-router-dom ^7.18.4, vite ^8.3.1, @vitejs/plugin-react ^6.1.1
  - backend: express ^5.2.1, nodemailer ^10.0.13, dotenv ^18.0.5
- Font: Noto Sans KR (Google Fonts, frontend/index.html에서 불러옴)
- Deployment target: (미정)

## Commands

Exact commands, with flags — an agent can't guess these, so keep this
section accurate and update it when a command changes.

frontend와 backend는 각자 폴더에서 따로 실행한다.

- Install: `cd frontend && npm install` / `cd backend && npm install`
- Dev server: `cd backend && npm run dev` (포트 4000) + 다른 터미널에서 `cd frontend && npm run dev` (포트 5173, `/api`는 backend로 프록시)
- Test (all): `cd backend && npm test`
- Test (single file): `cd backend && node --test test/contact.test.js`
- Build: `cd frontend && npm run build` (결과물 `frontend/dist/`)
- Lint / typecheck: 없음 (린터 미설치 — 추가하려면 의존성 승인 필요)

## Constraints

- 색·간격·글자 크기는 피그마 토큰 이름 그대로 CSS 변수로 쓴다 (예: `--color-accent`, `--space-24`)
  — 디자인: https://www.figma.com/design/bRAWl9wGTyqfdfpf3YNcrB

## Code style

- (link to the linter/formatter config if one exists; note only the
  conventions it doesn't already enforce — don't restate default language
  conventions the agent already knows)

## Project-specific boundary overrides

> Leave this section empty unless this project genuinely needs to loosen
> or tighten a default from `AGENTS.md`. Most projects won't need this.

- Always allowed (additions):
- Ask first (additions):
- Never (additions):
