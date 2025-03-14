
# Pocur Q

<div>
<img width="700" alt="main" src="https://github.com/user-attachments/assets/c16f90e5-82ca-426d-853f-b55f63c1d7c8"/> <img width="200" alt="main" src="https://github.com/user-attachments/assets/8baf901a-4b7b-4f27-8ca9-225f91c04772"/>
</div>

### 프로젝트 소개
Pocur Q는 QR을 활용한 **모바일 키오스크**와 **가게 포스기 기능**을 제공하는 웹 서비스입니다. 서비스의 주요 기능은 소비자가 접속하는 모바일 키오스크의 화면의 디자인을 가게 관리자가 원하는 대로 **커스텀**을 할 수 있습니다. 그 외 기능은 기존 포스기의 테이블 관리 기능과 가게 관리 기능이 있습니다.

### 프로젝트 기간 및 팀 구성
프로젝트 기간	: 2024.9 - 2024.10 2개월 <br>
Front : 김태영, 박병권 <br>
Back : 최효은, 이민형 <br>

### 개발 환경

|프레임 워크|배포|협업 툴|
|:---|---:|---:|
|Typescript, React, Vite|AWS EC2|Slack|
|Storybook, Tailwind|AWS RDS, AWS S3|Discord|
|Zustand, axios|AWS Lambda|Notion|
|Nest.js, MySQL, JWT|Docker|ERDCloud|

### 프로젝트 구조

<details>
  <summary>Back</summary>
  
  ```
  📦src
 ┣ 📂auth
 ┃ ┣ 📜auth.module.ts
 ┃ ┣ 📜jwt-auth.guard.ts
 ┃ ┗ 📜jwt.strategy.ts
 ┣ 📂calls
 ┃ ┣ 📂dtos
 ┃ ┃ ┣ 📜create-calls.dto.ts
 ┃ ┃ ┗ 📜update-calls.dto.ts
 ┃ ┣ 📂entities
 ┃ ┃ ┗ 📜calls.entity.ts
 ┃ ┣ 📜calls.controller.ts
 ┃ ┣ 📜calls.module.ts
 ┃ ┗ 📜calls.service.ts
 ┣ 📂categories
 ┃ ┣ 📂dtos
 ┃ ┃ ┗ 📜create-categories.dto.ts
 ┃ ┣ 📂entities
 ┃ ┃ ┗ 📜categories.entity.ts
 ┃ ┣ 📜categories.controller.ts
 ┃ ┣ 📜categories.module.ts
 ┃ ┗ 📜categories.service.ts
 ┣ 📂customer-jwt
 ┃ ┣ 📜customer-jwt.controller.ts
 ┃ ┣ 📜customer-jwt.module.ts
 ┃ ┗ 📜customer-jwt.service.ts
 ┣ 📂designPresets
 ┃ ┣ 📂dto
 ┃ ┃ ┣ 📜create-designPresets.dto.ts
 ┃ ┃ ┗ 📜update-designPresets.dto.ts
 ┃ ┣ 📂entities
 ┃ ┃ ┗ 📜designPresets.e시


