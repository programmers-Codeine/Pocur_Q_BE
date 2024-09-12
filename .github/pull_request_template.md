### 작업 개요
- 사용자 인증을 위한 로그인 기능을 구현
- JWT(JSON Web Token)를 사용하여 인증을 처리하도록 구현

### 반영 브랜치
ex) feat/login -> dev

### 연관된 이슈(optional)
- ex) #45

### 변경 사항(optional)
- `authController.js`: 사용자 로그인 로직 추가.
- `authService.js`: JWT 토큰 생성 및 검증 로직 추가.
- `userModel.js`: 사용자 데이터를 조회하는 메서드 추가.
- `login.spec.js`: 로그인 기능 테스트 코드 작성.

### 스크린샷(optional)
- **로그인 페이지 (정상 로그인)**
  ![login-success](https://example.com/login-success.png)
- **로그인 페이지 (오류 메시지)**
  ![login-error](https://example.com/login-error.png)

### 해결 과정(optional)
- 오류나 문제가 있는 Issue에 대해서 해결했을 때 해결 방법을 적어주세요

### 기타 참고 사항(optional)
- JWT 토큰의 만료 시간은 1시간으로 설정했습니다. 추후 필요에 따라 이 값을 조정할 수 있습니다.
- 로그인 UI는 디자인 팀과 협의 후 추가 개선 작업이 예정되어 있습니다.

### 체크리스트
- [x] 코드가 정상적으로 작동하고 모든 테스트를 통과했나요?
- [x] 문서화가 필요한 경우, 문서화가 완료되었나요?
- [x] 코드 스타일 가이드라인을 따랐나요?
- [x] 관련된 모든 이슈가 링크되었나요?
- [x] 필요한 경우, 팀원에게 알렸나요?
