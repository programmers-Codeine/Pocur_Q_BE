
# Pocur Q

<div>
<img width="600" alt="main" src="https://github.com/user-attachments/assets/c16f90e5-82ca-426d-853f-b55f63c1d7c8"/> <img height="300" alt="main" src="https://github.com/user-attachments/assets/8baf901a-4b7b-4f27-8ca9-225f91c04772"/>
</div>

### 프로젝트 소개
Pocur Q는 QR을 활용한 **모바일 키오스크**와 **가게 포스기 기능**을 제공하는 웹 서비스입니다. 서비스의 주요 기능은 소비자가 접속하는 모바일 키오스크의 화면의 디자인을 가게 관리자가 원하는 대로 **커스텀**을 할 수 있습니다. 그 외 기능은 기존 포스기의 테이블 관리 기능과 가게 관리 기능이 있습니다.

<br>
배포 링크 : https://pocurq.shop/

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

백엔드
  
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
 ┃ ┃ ┗ 📜designPresets.entity.ts
 ┃ ┣ 📜designPresets.controller.ts
 ┃ ┣ 📜designPresets.module.ts
 ┃ ┗ 📜designPresets.service.ts
 ┣ 📂designs
 ┃ ┣ 📂dto
 ┃ ┃ ┣ 📜create-designs.dto.ts
 ┃ ┃ ┣ 📜response-designs.dto.ts
 ┃ ┃ ┗ 📜update-designs.dto.ts
 ┃ ┣ 📂entities
 ┃ ┃ ┗ 📜designs.entity.ts
 ┃ ┣ 📜designs.controller.ts
 ┃ ┣ 📜designs.module.ts
 ┃ ┗ 📜designs.service.ts
 ┣ 📂health-check
 ┃ ┗ 📜health-check.controller.ts
 ┣ 📂img-upload
 ┃ ┣ 📜imgUpload.controller.ts
 ┃ ┣ 📜imgUpload.module.ts
 ┃ ┗ 📜imgUpload.service.ts
 ┣ 📂menus
 ┃ ┣ 📂dtos
 ┃ ┃ ┣ 📜create-menus.dto.ts
 ┃ ┃ ┣ 📜get-all-menus-response.dto.ts
 ┃ ┃ ┣ 📜get-menu-response.dto.ts
 ┃ ┃ ┗ 📜update-menus.dto.ts
 ┃ ┣ 📂entities
 ┃ ┃ ┗ 📜menus.entity.ts
 ┃ ┣ 📜menus.controller.ts
 ┃ ┣ 📜menus.module.ts
 ┃ ┗ 📜menus.service.ts
 ┣ 📂options
 ┃ ┣ 📂dtos
 ┃ ┃ ┣ 📜create-options.dro.ts
 ┃ ┃ ┗ 📜option-response.dto.ts
 ┃ ┣ 📂entities
 ┃ ┃ ┗ 📜options.entity.ts
 ┃ ┣ 📜options.controller.ts
 ┃ ┣ 📜options.module.ts
 ┃ ┗ 📜options.service.ts
 ┣ 📂orders
 ┃ ┣ 📂dto
 ┃ ┃ ┗ 📜create-orders.dto.ts
 ┃ ┣ 📂entities
 ┃ ┃ ┗ 📜orders.entity.ts
 ┃ ┣ 📜orders.controller.ts
 ┃ ┣ 📜orders.module.ts
 ┃ ┗ 📜orders.service.ts
 ┣ 📂restaurants
 ┃ ┣ 📂dto
 ┃ ┃ ┣ 📜create-restaurants.dto.ts
 ┃ ┃ ┗ 📜update-restaurants.dto.ts
 ┃ ┣ 📂entities
 ┃ ┃ ┗ 📜restaurants.entity.ts
 ┃ ┣ 📜restaurants.controller.ts
 ┃ ┣ 📜restaurants.module.ts
 ┃ ┗ 📜restaurants.service.ts
 ┣ 📂restaurantTables
 ┃ ┣ 📂entities
 ┃ ┃ ┗ 📜restaurantTables.entity.ts
 ┃ ┣ 📜restaurantTables.controller.ts
 ┃ ┣ 📜restaurantTables.module.ts
 ┃ ┗ 📜restaurantTables.service.ts
 ┣ 📂socket
 ┃ ┗ 📜socket.gateway.ts
 ┣ 📂urls
 ┃ ┣ 📂entities
 ┃ ┃ ┗ 📜urls.entity.ts
 ┃ ┣ 📜urls.controller.ts
 ┃ ┣ 📜urls.module.ts
 ┃ ┗ 📜urls.service.ts
 ┣ 📂users
 ┃ ┣ 📂dtos
 ┃ ┃ ┣ 📜create-user.dto.ts
 ┃ ┃ ┗ 📜login-user.dto.ts
 ┃ ┣ 📂entities
 ┃ ┃ ┗ 📜users.entity.ts
 ┃ ┣ 📜users.controller.ts
 ┃ ┣ 📜users.module.ts
 ┃ ┗ 📜users.service.ts
 ┣ 📜app.module.ts
 ┗ 📜main.ts

```

프론트

```
#구조
```

## 화면 및 기능

구현한 화면과 해당 화면 내 기능을 설명하겠습니다.

### 시작 화면 & 로그인 화면

- 시작 화면에서 클릭을 하면 로그인 화면으로 넘어가게 됩니다.
- 기존 회원의 경우 로그인을 할 수 있습니다.
- 회원이 아닌 경우 회원가입 페이지로 넘어갈 수 있습니다.
- $\color{#aaa}비밀번호\ 찾기\ 기능(미구현)$

<img width="400" alt="main" src="https://github.com/user-attachments/assets/c16f90e5-82ca-426d-853f-b55f63c1d7c8"/><img width="400" alt="login" src="https://github.com/user-attachments/assets/4dcab3b4-975b-42b5-ad9f-06756bee3cc4"/>

### 회원가입
- 이메일, 비밀번호, 닉네임을 모두 입력해야 회원 가입이 가능합니다.
  - 이메일의 경우 형식을 지키지 않을 경우 경고 문구가 발생합니다.
  - 비밀번호의 경우 6자 이상이어야 합니다.

<img width="400" alt="signup" src="https://github.com/user-attachments/assets/02ba8ca8-4883-4528-9874-d51b3cddf4d7"/>

### 가게 생성
- 처음 이용하는 가게 관리자의 경우 가게 정보(기본 테이블 수, 가게 이름)를 입력해야 합니다.
- 모든 정보가 입력되면 가게를 생성하고 관리를 시작할 수 있습니다.

<img width="400" alt="create shop no input" src="https://github.com/user-attachments/assets/4fa89c6d-991a-401e-9ddf-0900ffc525fc"/>
<img width="400" alt="create shop fill input" src="https://github.com/user-attachments/assets/66125eca-ed29-439b-b0d1-07f428d95b39"/>

### 관리 화면

#### 테이블 관리
- 가게 생성 시 입력한 기본 테이블 수만큼 테이블이 생성됩니다.
- 추가 테이블은 원하는 경우 추가/삭제할 수 있습니다.
  - 기본 테이블은 테이블 관리에서 삭제할 수 없습니다.
- 테이블을 클릭하면 상세 내을 확인할 수 있습니다.
  - 주문 목록은 주문한 메뉴 이름, 주문 수량, 메뉴 옵션, 가격, $\color{#aaa}주문\ 시간(미구현)$을 확인할 수 있습니다.
  - 휴지통 버튼을 클릭하면 테이블을 초기화할 수 있습니다.
  - $\color{#aaa}결제하기\ 버튼을\ 클릭하면\ 직접\ 결제할\ 수\ 있습니다.(미구현)$
- 테이블이 생성되면 QR 탭에 자동으로 테이블에 대한 QR이 생성됩니다.
  - 테이블 하나의 QR을 프린트할 수 있습니다.
  - 전체 테이블의 QR들을 프린트할 수 있습니다.
  - 전체 테이블 QR들의 이미지를 저장할 수 있습니다.

<img width="400" alt="manage table" src="https://github.com/user-attachments/assets/2c1cf28a-422f-4ecd-b5f9-a10e51c2d9c0"/>
<img width="400" alt="delete table" src="https://github.com/user-attachments/assets/e7bbfd33-d9fd-430c-a887-799544a3a25f"/>
<img width="400" alt="show table detail" src="https://github.com/user-attachments/assets/12e4e569-a267-4bfa-b3b0-2cd969134769"/>
<img width="400" alt="reset table info" src="https://github.com/user-attachments/assets/b332d038-733e-471b-acab-b327f4605fd2"/>
<img width="400" alt="manage table" src="https://github.com/user-attachments/assets/fc087d8e-4339-4dcc-a795-a91e6876b3f3"/>

- Socket.io를 사용해 소비자에서 주문을 하면 관리자 화면에서 주문 내용을 확인할 수 있습니다.
<img width="400" alt="socket mov" src="https://github.com/user-attachments/assets/ea604dc5-dda4-40e1-8a62-b4507ff7e0c7"/>

#### 실시간 메뉴 관리
- 소비자가 보고 있는 화면의 메뉴 상태를 관리할 수 있습니다.
  - $\color{#aaa}실시간(미구현)$
  - API를 통해 새로 접속하거나 새로 고침할 경우 적용
- 상태에 따라 소비자가 보는 메뉴 화면이 달라집니다.
- 제공되는 상태
  - '품절(Sold Out)': 더 이상 판매가 불가능한 메뉴
  - '인기 상품(Hot)': 소비자에게 추천하고 싶은 메뉴
  - '신상품(New)': 새로 출시한 메뉴
  - '보여주기 여부(ON/OFF)': 소비자 화면에서 보이는 여부

<img width="400" alt="manage menu" src="https://github.com/user-attachments/assets/fb93e482-1879-4109-97fd-f4fba61e566d"/>

#### $\color{#aaa}통계\ 및\ 분석(미구현)$

### 세팅 화면

#### 메뉴 세팅
- 소비자 화면에 보는 카테고리, 메뉴를 관리할 수 있습니다.
- 카테고리를 추가/삭제할 수 있습니다.
- 메뉴를 추가/수정/삭제할 수 있습니다.
- $\color{#aaa}빠른\ 도구를\ 추가/삭제할\ 수\ 있습니다.(미구현)$

<img width="400" alt="manage table" src="https://github.com/user-attachments/assets/d25177a8-c335-417e-bf12-d4274ed5f2fe"/>
<img width="400" alt="manage table" src="https://github.com/user-attachments/assets/2b650fde-b6c3-4b68-8f03-86521c4e1bab"/>

#### 디자인 세팅
- 소비자 화면을 가게 관리자가 원하는 대로 디자인할 수 있습니다.
- 소비자 화면에 적용되는 것을 좌측에서 확인할 수 있습니다.
- 색상을 변경할 수 있습니다.
- $\color{#aaa}내부\ 요소의\ 위치를\ 변경할\ 수\ 있습니다.(미구현)$

<img width="400" alt="manage table" src="https://github.com/user-attachments/assets/6fafe13b-ebb7-436c-bacd-d8bb8cc630c0"/>
<img width="400" alt="manage table" src="https://github.com/user-attachments/assets/9f881f7b-c5ba-483c-82d6-7f35cc68837c"/>   

- 색상이 적용되고 있는 화면
<img width="150" alt="manage table" src="https://github.com/user-attachments/assets/22073011-cc19-4d2f-aad6-e9b0b22bdf16"/>
<img width="150" alt="manage table" src="https://github.com/user-attachments/assets/40b6e325-95d1-4085-ae20-e40b5ace075a"/>
<img width="150" alt="manage table" src="https://github.com/user-attachments/assets/250b2c93-b5b3-471f-90cf-f79182b69de3"/>

#### 기타 세팅
- 메뉴와 디자인을 제외한 가게 정보를 관리할 수 있습니다.
  - 기본 테이블 수
  - 가게 이름
  - 가게 로고 이미지
  - 가게 소게 멘트
  - 주문 성공 멘트
  - $\color{#aaa}소비자\ 선결제\ 기능(미구현)$
- 저장하기 버튼을 누르면 변경 사항이 적용되고, 실제 소비자 화면을 동작시켜 볼 수 있습니다.
  - 1번 테이블 화면을 보여줍니다.
  - $\color{#aaa}실제\ 소비자\ 화면과\ 관련\ 없는\ 화면\ 보여주기(미구현)\ ex)\ 0번\ 테이블$

<img width="400" alt="manage table" src="https://github.com/user-attachments/assets/31c6f6e5-f675-4a3e-8e67-a6974e2eecde"/>

## 발표 PPT
전체 시연 영상이 포함된 PPT입니다. 시연이 궁금하신 경우 참고 부탁드립니다.
### [코댕-최종발표](https://www.canva.com/design/DAGR1VSI5nk/PcrUUBx9rrBNcOd45nYuOw/view?utm_content=DAGR1VSI5nk&utm_campaign=designshare&utm_medium=link&utm_source=editor)

