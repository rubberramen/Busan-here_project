## <부산, 이곳은(Busan, here)>
### - 부산에 정착한 외지인이 지인에게 추천할 맛집, 명소 지도 웹 서비스 
<!--
<img src="https://user-images.githubusercontent.com/96553431/168752791-4cda4d98-fb79-4561-9c28-7941b6bb9d49.png" width="175" height="150"><br>
![busan,here_logo5](https://user-images.githubusercontent.com/96553431/168899776-e026d934-d8af-40ed-8f2c-f3c789022890.png)
-->

<img src="https://user-images.githubusercontent.com/96553431/168899776-e026d934-d8af-40ed-8f2c-f3c789022890.png" width="185" height="150"><br>
<br>

### 1. 프로젝트 개요
- 프로젝트명 : 부산, 이곳은(Busan, here)
- 개발 기간 : '22.05.06 ~ 진행 중(50% 완료)
- 프로그램 소개
    - 부산에 정착한 외지인이 지인에게 당당히 추천할 맛집, 명소 지도 웹 서비스 
- 개발 동기
    - 30년 이상 서울에서 살다가, 부산에 정착함
    - 가족, 친구, 지인들이 부산을 방문할 때, 안내 필요
    - 이를 보조할 수 있는 웹 프로그램을 구현하고자 함
- 프로젝트 목표
    - Node.js, Express를 활용한 웹 프로그램 개발
    - Rest API를 완벽히 이해하고 구현
    - AWS를 활용해 실제 지인들이 이용할 수 있는 프로그램 개발
    - HTML, CSS 이해를 통한 프론트 기초 다지기
    - 사용자 친화적인 UI 및 UX 구현

### 2. 개발 환경
- OS : Windows10 64bit
- IDE : VS Code(1.66.2), Jupyter notebook(6.4.5), Google Colab
- DB : MySQL 8.0CE
- Server : AWS, Nginx
- Language
    - Front : HTML5, JavaScript(ES5), CSS3, Library : axios
    - Back : Node(16.13.2), Express.js(4.16.1), JavaScript(ES6)

### 4. 기능
- 회원 가입 : 간단한 양식의 회원 가입을 하면, 본인이 다녀온 곳의 평점을 올릴 수 있음
- 카테고리 : 카테고리 클릭, 선택 시 해당 식당, 명소들이 카카오 맵에 핀으로 표시
- 카카오 맵 핀 클릭 : 해당 식당, 명소에 관한 정보를 window로 표시
- 유튜브 연동 : 식당 및 명소들의 유튜브 영상에 접근


### 5. UI 샘플
<img width="798" alt="20220517155527" src="https://user-images.githubusercontent.com/96553431/168900202-71b88059-d6c2-45d5-b4cf-745d8d2e1c6d.png">

### 6. 애로사항
- AWS
    - 로컬에서 개발 사항을 반영할 시, 알수없는 오류가 발생할 때가 있어, 서비스의 안정성이 담보되지 않음
    - AWS 및 서버에 관해 시행착오를 겪고, 추가적인 연구 필요
- Front
    - HTML, CSS 문법을 안다고 해서 UI를 잘 꾸밀 수 없음
    - 디자인적 적용 방안 및 연구 필요


