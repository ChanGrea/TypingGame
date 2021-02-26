# Typing Game

>주어진 단어가 표시되면 input에 단어를 정해진 시간 내에 입력하여 점수를 획득하는 어플리케이션 개발



## 1. 개발환경

- Javascript ES6
- node v14.15.0 (npm v6.14.8)
- Webpack 5.0.0-rc.3
- Webpack-dev-server 3.11.0
- Jest 26.6.3



### 1.1 Folder Structure

```
.
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── index.css
│   ├── index.css.map
│   ├── index.html
│   ├── main.js
│   └── main.js.map
├── src
│   ├── index.css
│   ├── index.html
│   ├── index.js
│   ├── js
│   │   ├── game.js
│   │   ├── game.test.js
│   │   ├── result.js
│   │   └── result.test.js
│   ├── page
│   │   ├── game.js
│   │   └── result.js
│   └── router.js
└── webpack.config.js
```





## 2. 설치 및 실행 방법

### 2.1 script

#### `npm install`

- 실행에 필요한 모듈 설치



#### `npm run start`

- webpack-dev-server 환경으로 실행



#### `npm run test`

- 테스트 수행



#### `npm run build`

- public 폴더에 번들링 한 결과 export



### 2.2 설치

- `npm install`



### 2.3 실행

- (webpack-dev-server) `npm run start`
- (build 결과물 실행) `npm run build` 후, **public/index.html**을 live server로 실행



## 3. 과제 요구사항

### 3.1 기능 요구사항

#### 화면 구성

- [x] 페이지를 접속하면 게임 화면을 표시한다. 
- [x] 남은 시간 : 각 단어는 제한 시간이 존재하며, 단어별 남은 시간을 표시한다. 
- [x] 점수 : 총 문제 수를 점수로 하여 시간 만료 시 1점씩 삭감하는 형태로 한다. 
- [x] 단어 표시 : 제시된 단어를 표시한다. 
- [x] 입력 : 단어를 입력할 수 있는 input box를 표시한다. 
  - [x] input box 에서 엔터키 입력 시 현재 입력한 텍스트와 주어진 문구와 비 교하여 맞으면 다음 문제, 틀리면 input box를 clear한다. 
- [x] 시작 : 게임을 시작할 수 있는 버튼을 표시한다. 
  - [x] 시작 버튼을 누르면 텍스트는 "초기화"로 변경 되며 click시 모든 게임이 초기화 되고 "시작" 텍스트로 변경된다.

#### 완료 화면

- [x] 모든 게임이 완료되면 완료 화면으로 이동한다.
- [x] 현재까지 획득한 점수를 표시한다.
- [x] 단어 당 해결 답변(해결) 시간을 표시한다.
  - [x] 실패 시 평균 시간에 포함하지 않는다.
- [x] "다시 시작" 버튼을 통해 게임 화면을 다시 표시하여 게임을 다시 시작한다.



### 3.2 환경 요구사항

- [x] webpack 환경을 구성
  - [x] webpack-dev-server 환경 구성
  - [x] start script를 통해서 hot-loading 적용
  - [x] build script를 구성하여 /public 폴더에 빌드한 html, js, css를 export
- [x] 모든 구현은 vanilla javascript(es5, es6, typescript도 가능)로 구현한다.
- [x] 게임 화면과 완료화면을 routing을 통하여 이동한다. (라우터 직접 구현 - 구현 방법은 자율)
- [x] 단위 테스트 적용
  - 단위 테스트는 테스팅 library를 사용해도 무방함
- [x] 단어는 서버에 요청하여 받아 온다.



## 4. 문제 해결 전략

### 가장 먼저 webpack 환경을 구성

- webpack, webpack-cli, webpack-dev-server를 설치
  - port : 9000
  - hot-loading 적용, 실행 시 브라우저 자동 실행
- html을 사용하기 위한 html-webpack-plugin
  - index.html을 템플릿으로 활용하여 사용
- css 파일 추출을 위한 mini-css-extract-plugin, css-loader
  - style-loader를 통해 직접 style 태그를 삽입하는 경우가 많지만, 요구사항에 따라 css파일로 따로 분리하기 위해 해당 플러그인 사용
- 테스트를 위한 jest
  - React를 많이 사용한 경험이 있어 그에 익숙한 라이브러리 jest 선택
- es6와 브라우저 호환을 위한 babel

- start, build, test 스크립트 적용 및 테스트



### 각 화면에 대해 HTML, CSS를 활용한 컴포넌트 설계 및 개발 진행

- 화면의 요소를 Block 단위로 분리
- Container, Block 등 공통으로 활용 가능한 부분 사용
- CSS는 BEM(Block Element Modifier) 아키텍쳐 사용
- 각 화면에 대해서 따로 HTML, CSS 파일을 구성하기보다는 index.html에서 컨테이너에 스위칭 할 수 있도록 템플릿 형태를 리턴하는 js 파일로 개발
  - SPA(Single Page Application) 형태로 만드려고 의도적으로 이렇게 구성



### 폴더 구조

- **src 루트**에는 entry point 역할을 하는 index.html, index.js와 index.css, 라우팅 파일(route.js)만 구성
- **page 폴더**에는 각 화면(게임, 결과)에 대한 템플릿, DOM 관련 리스너 등이 정의되어 있는 파일 구성
- **js 폴더**에는 화면에 필요한 기능들의 함수로 정의하여 파일로 구성
  - 각 파일에 대해서 테스트 코드 파일도 함께 구성



### 기능 요구사항에 따른 Javascript 개발

- 주요 영역에 대해 id property 부여하여 요구사항에 맞게 값 변경하여 개발
- 다음 문제를 보여주는 부분에서 어떤 시점에 어떻게 핸들링할지 로직에 대한 고민이 있었음
  - setInterval과 clearInterval을 적절하게 사용해서 구현



### Routing 개발 요구사항에 대한 고민

- 단순 path만 변경하는지, hash를 사용하는지 등에 대한 여러 기능이 있었지만, 이 과제에서는 path만 변경하는 쪽으로 범위를 제한
- SPA처럼 path에 따라 일부 컴포넌트만 변경하는 방식으로 구현
  - 기존 html을 es6의 template literals 형태로 리턴하도록 js 파일 구성 (game.js, result.js)
- router.js 파일에 따로 모듈화하여 import해서 사용



### Test 코드 개발

- 여러 테스팅 라이브러리가 있었는데, 그 중 React를 많이 사용한 경험이 있어 그에 익숙한 Jest를 선택
- 주로 DOM을 핸들링하는 코드가 많았고, 분리한다고 해서 분리했지만 dependency가 걸려 있는 함수가 존재
  - Typing Game에서 주 기능을 하는 부분 분리 (src > js > **.js)
    - 데이터 요청(getData)
    - 정답 유무 체크(checkAnswer), 
    - 점수 획득(getScore), 
    - 결과 점수 계산(getAvgtime)

