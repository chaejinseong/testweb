# 카페 사이트 스택·페이지 구성

- Date: 2026-10-01
- Author: agent (채진성 결정)
- Related initiative: docs/prd/practice-01-cafe.md

## Decision

- 기술 스택: React + Node.js
- 기본 섹션 5개 모두 유지 + 가게 이야기, 공지/소식, 문의하기 추가
- 5페이지로 나눔: `/` 홈, `/menu`, `/story`, `/news`, `/contact`
- 문의는 Node.js 서버가 받아 사장님 이메일로 전달

## Why

- React 라우팅과 Node.js 서버를 함께 연습할 수 있는 구성 (채진성 선택)
- 이메일 수신이 실제 소상공인 납품에서 흔한 방식이라는 판단 [ASSUMPTION]

## Alternatives considered

- 1페이지 스크롤 / 4페이지(가게 이야기를 홈에 합침) → 5페이지 선택
- 문의 처리: 화면만(전송 없음), 카카오톡·전화 외부 링크 → 이메일 선택

## Status

decided

## Follow-ups

- 원페이저 승인 대기 (docs/prd/practice-01-cafe.md)
