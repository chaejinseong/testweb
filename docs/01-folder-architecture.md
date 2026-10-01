# Folder Architecture

## Top-level layout

```
kmong-practice/
├─ AGENTS.md, SPEC.md, docs/   작업 규칙·계획·문서
├─ frontend/                   React + Vite (포트 5173)
│  ├─ vite.config.js           /api → backend 프록시
│  ├─ index.html               Noto Sans KR 로드
│  ├─ public/images/           무료 상업용·AI 이미지
│  └─ src/
│     ├─ main.jsx, App.jsx     시작점, 라우팅
│     ├─ pages/                Home, Menu, Story, News, Contact
│     ├─ components/           Header, Footer, MenuList 등
│     ├─ data/                 store / menu / news / story .json
│     ├─ api/                  backend 호출 함수
│     └─ styles/               global.css (피그마 토큰 = CSS 변수)
└─ backend/                    Node.js + Express (포트 4000)
   ├─ .env.example             환경변수 이름만
   ├─ src/
   │  ├─ index.js              서버 시작
   │  ├─ app.js                Express 앱 (테스트에서 재사용)
   │  ├─ config.js             환경변수 읽기
   │  ├─ routes/               경로 (예: POST /api/contact)
   │  ├─ validators/           입력값 확인
   │  └─ services/             실제 처리 (메일 발송)
   └─ test/                    node:test
```

## Responsibilities

- `docs/` — standards and working history (see `AGENTS.md`)
- `frontend/` — 화면. 가게 내용은 `src/data/` JSON에만 둔다
- `backend/` — 문의 접수와 메일 발송만 담당

## Conventions

- frontend·backend는 각자 package.json을 가진 독립 폴더
- backend 새 기능: routes → validators → services 순서로 파일 추가
- 다른 가게로 바꿀 때는 `frontend/src/data/`만 교체
- 건드리지 말 것: `backend/.env` (진성님이 직접 작성), `node_modules/`, `frontend/dist/`
