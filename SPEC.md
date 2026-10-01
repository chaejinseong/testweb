# SPEC — 느린오후 커피 사이트 (연습 1번)

- Status: 승인 대기
- 근거: `../planning/docs/prd/practice-01-cafe.md` (Approved)
- 이 파일은 작업이 끝나 report로 정리되면 삭제한다 (`AGENTS.md` 규칙)

## 1. 만들 것

모바일 우선 5페이지 소개 사이트 + 문의를 이메일로 전달하는 작은 서버.

| 경로 | 페이지 | 내용 |
|---|---|---|
| `/` | 홈 | 소개(이름·한 줄 소개·대표 사진), 메뉴 미리보기 3~4개, 영업시간, 위치+연락처 |
| `/menu` | 메뉴 | 커피·음료·디저트 전체 + 가격 |
| `/story` | 가게 이야기 | 사장님 이야기, 원두·로스팅 소개 |
| `/news` | 공지/소식 | 휴무·신메뉴·이벤트 목록 (최신순) |
| `/contact` | 문의하기 | 이름·연락처·문의 유형(단체 주문/대관/기타)·내용 → 전송 |

빼는 것: 예약·주문·결제, 로그인, 관리자 페이지, DB.

## 2. 폴더 구조

```
cafe-site/
├─ AGENTS.md                작업 규칙 (템플릿)
├─ SPEC.md                  이 계획서 (완료 후 삭제)
├─ docs/                    작업 문서 (템플릿: specs, todo, reports)
│
├─ frontend/                프론트엔드 — React + Vite
│  ├─ package.json
│  ├─ vite.config.js        개발 중 /api 요청을 backend로 전달 (proxy)
│  ├─ index.html
│  ├─ public/images/        무료 상업용·AI 이미지
│  └─ src/
│     ├─ main.jsx           앱 시작점
│     ├─ App.jsx            라우팅 (5개 경로)
│     ├─ pages/             Home, Menu, Story, News, Contact
│     ├─ components/        Header, Footer, MenuList, HoursTable, MapBox, NewsList
│     ├─ data/              store.json(가게 정보·영업시간), menu.json, news.json, story.json
│     ├─ api/               contact.js — backend 호출 함수
│     └─ styles/            global.css (모던한 톤 색상·글꼴 변수)
│
└─ backend/                 백엔드 — Node.js + Express
   ├─ package.json
   ├─ .env.example          환경변수 이름만 (값은 진성님이 .env에 직접)
   ├─ src/
   │  ├─ index.js           서버 시작
   │  ├─ app.js             Express 앱 설정 (테스트에서 재사용)
   │  ├─ routes/contact.js  POST /api/contact
   │  ├─ validators/contact.js  입력값 확인 (필수값·길이·형식)
   │  ├─ services/mail.js   이메일 발송 (.env 없으면 콘솔 출력)
   │  └─ config.js          환경변수 읽기
   └─ test/contact.test.js  node:test — 200 / 400 케이스
```

- frontend와 backend는 **각자 package.json을 가진 독립 폴더**다. 따로 설치·실행하고, 나중에 배포도 따로 할 수 있다.
- 백엔드는 역할별로 나눈다: 경로(routes) → 입력 확인(validators) → 실제 처리(services). 2번 연습에서 예약 문의 등이 늘어나도 같은 패턴으로 추가한다.
- 메뉴·소식·가게 정보는 **JSON 파일로 분리**한다. 다른 가게로 바꿀 때 데이터만 갈아끼우면 되도록 (2번·3번 연습에서 재사용).

## 3. 추가할 의존성 — 승인 필요

| 위치 | 패키지 | 용도 |
|---|---|---|
| frontend | react, react-dom, vite, @vitejs/plugin-react | React 화면, 개발 서버·빌드 |
| frontend | react-router-dom | 5페이지 이동 |
| backend | express | `/api/contact` 서버 |
| backend | nodemailer | 이메일 발송 |
| backend | dotenv | `.env`에서 메일 계정 읽기 |

- 버전은 설치 시점의 최신 안정 버전을 쓰고, 설치 후 `02-specs.md`에 기록한다.
- 테스트는 Node 내장 `node:test`를 써서 **테스트용 패키지는 추가하지 않는다**.
- 지도: 외부 지도 API(키 필요·비용 가능)는 쓰지 않고, 예시 위치 이미지 + "지도 앱에서 열기" 링크로 대신한다.

## 4. 문의 → 이메일 흐름

1. `/contact` 폼 제출 → `POST /api/contact`
2. 서버가 입력값 확인 (필수값, 길이 제한, 이메일/전화 형식) → 틀리면 400과 이유
3. nodemailer로 사장님 주소에 메일 발송 → 성공 시 "접수됐어요" 화면
4. 메일 계정 정보는 `.env`의 `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `OWNER_EMAIL`
   - **`.env`는 진성님이 직접 작성**. 저는 `.env.example`(이름만)까지만 만든다.
   - `.env`가 없으면 서버는 메일을 보내지 않고 콘솔에 문의 내용만 출력한다 (개발용 모드).
     → 실제 메일 발송 없이도 연습과 테스트가 가능

## 5. 작업 순서 (단계마다 확인 가능하게)

0. **디자인 (피그마)** — 모던한 톤, 모바일 5화면 + 데스크톱 5화면. 진성님 확인 후 코드 시작 (10:41 시작 → 11:05 시안 완료 → 15:08 확정)
   - 파일: https://www.figma.com/design/bRAWl9wGTyqfdfpf3YNcrB
   - 코드로 옮길 때 색·간격·글자 크기는 피그마 토큰 이름 그대로 CSS 변수로 쓴다 (예: `--color-accent`, `--space-24`)
1. 프로젝트 생성 + 의존성 설치 → `02-specs.md` Commands 채우기 ✅ (15:37–15:38, 빌드·테스트·서버 확인 완료)
2. 공통 레이아웃: Header·Footer, 5개 빈 페이지와 라우팅
3. 데이터 JSON 작성 (가상 메뉴·소식·가게 정보)
4. 페이지 채우기: 홈 → 메뉴 → 가게 이야기 → 소식
5. 문의하기 화면 + 서버 (개발용 모드로 먼저)
6. 피그마 디자인과 비교해 다듬기 (모바일·데스크톱)
7. 확인 후 report 작성, SPEC.md 삭제

각 단계가 끝날 때 짧게 알려드리고, 단계 사이에서 멈출 수 있게 진행한다.

## 6. 확인 방법 (완료 기준)

- `frontend` 빌드가 에러 없이 끝남
- backend 테스트(`node --test`) 통과: 정상 입력 200, 필수값 누락 400, 형식 오류 400
- 5개 경로가 모두 열리고, 휴대폰 폭(약 375px)에서 가로 스크롤 없음
- 이미지 출처 확인: 무료 상업용 또는 AI 생성만 사용
- 실제 메일 발송은 진성님이 `.env`를 넣은 뒤 직접 확인 (제가 대신 확인할 수 없음)

## 7. 시간 측정

- 실제 크몽 작업도 Claude를 이용해 만들 예정이라 (2026-10-01 결정), **진성님 + Claude 협업 전체 시간**이 가격 기준이 된다.
- 단계 0 시작 시각(2026-10-01 10:41)과 단계 7 종료 시각, 단계별 소요 시간을 report에 적는다.
- 지시·검토·수정 요청에 쓴 시간도 포함한다 (실제 납품 때도 드는 시간이므로).
