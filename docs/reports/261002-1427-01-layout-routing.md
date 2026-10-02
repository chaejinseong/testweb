# 단계 2: 공통 레이아웃 + 5개 페이지 라우팅

- Date: 2026-10-02
- Author: agent (채진성 승인)
- Related todo: docs/todo/261002-1427-01-figma-tokens.md

## What changed

- `frontend/src/main.jsx`: BrowserRouter, global.css 연결
- `frontend/src/App.jsx`: Header → 5개 경로(`/`, `/menu`, `/story`, `/news`, `/contact`) → Footer, 없는 주소는 홈으로
- `frontend/src/components/Header.jsx`: 로고 + 메뉴 5개(현재 페이지 강조), 768px 미만은 ☰ 버튼으로 열고 닫음, 링크 누르면 닫힘
- `frontend/src/components/Footer.jsx`: 가게 이름·영업시간·주소·전화 (임시 문구, 3단계에서 store.json으로)
- `frontend/src/pages/*.jsx`: 제목만 있는 빈 페이지 5개
- `frontend/src/styles/global.css`: 토큰 CSS 변수 + 기본·헤더·푸터 스타일

## Why

- SPEC.md 단계 2
- 피그마 MCP 호출 한도 초과로 토큰을 못 읽어서 `--color-accent`(#B4532A)·글꼴만 확정값, 나머지는 임시값 (진성님 결정)

## Verified

- `npm run build` 성공
- 빌드 결과를 띄우고 375px 프레임에서 확인: 5개 경로 모두 해당 제목 표시, 가로 스크롤 없음(scrollWidth 360 = 375 − 세로 스크롤바), ☰ 버튼 보임
- ☰ 누르면 메뉴 열림·현재 페이지 강조, 링크 누르면 이동 후 메뉴 닫힘
- 1440px 캡처: 가로 메뉴 + 현재 페이지 강조색 확인
- 없는 주소(`/nope`) → 홈으로 이동 확인

## Time

- 14:22 → 14:27 (계획 승인 후 구현·확인, 피그마 한도 질문 포함). 계획 작성은 별도 약 2분

## Follow-ups

- docs/todo/261002-1427-01-figma-tokens.md
