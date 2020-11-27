import "./index.css";
import { rootDiv, routes, onNavigate } from "./router.js";
const { getScore, checkAnswer, getAvgTime } = require("./func");

// build 결과물 실행 route 처리 용도 <-- start
let rootPath = window.location.pathname;
if (rootPath.indexOf("/public") >= 0) {
  rootPath = "/";
}
// build 결과물 실행 route 처리 용도 --> end
rootDiv.innerHTML = routes[rootPath]();

let data = null,
  timer = null,
  responseTime = 0,
  totalTime = 0;
const startButton = document.getElementById("startBtn"); // '시작' 버튼
const answerInput = document.getElementById("answerInput"); // '입력' 영역
const time = document.getElementById("time"); // '남은 시간' 영역
const score = document.getElementById("score"); // '점수' 영역
const question = document.getElementById("question"); // '문제 단어' 영역

// 화면 로딩 시, 단어 데이터 요청
window.onload = () => {
  getData().then(result => {
    data = result;
  });
};
// 서버로부터 데이터를 가져와서 local에 셋팅
const getData = async () => {
  const response = await fetch(
    `https://my-json-server.typicode.com/kakaopay-fe/resources/words`
  );
  const json = await response.json();

  return json;
};

// '시작'버튼 이벤트 핸들링
startButton.addEventListener("click", () => {
  if (startButton.innerText === "초기화") {
    init();
  } else {
    start();
  }
});

// '입력' 영역 이벤트 핸들링
answerInput.addEventListener("keypress", e => {
  // 엔터 키 입력 시
  if (e.key === "Enter") {
    const userInput = answerInput.value;
    const isAnswer = checkAnswer(question.innerText, userInput);
    // 정답일 경우, 점수를 얻고 다음 문제로 넘어간다.
    if (isAnswer) {
      score.innerText = getScore(parseInt(score.innerText), 1);
      totalTime += responseTime;
      nextQuestion();
    }

    answerInput.value = "";
  }
});

// '초기화' 기능
const init = () => {
  if (timer) clearInterval(timer);
  time.innerText = 0;
  score.innerText = 0;
  question.innerText = "문제 단어";
  answerInput.value = "";
  answerInput.readOnly = true;
  startButton.innerText = "시작";
};

// '시작' 기능
const start = () => {
  answerInput.readOnly = false;
  answerInput.focus();
  startButton.innerText = "초기화";

  nextQuestion();
};

// 다음 문제로 넘어가는 기능
const nextQuestion = () => {
  if (timer) clearInterval(timer);

  // 남은 단어 데이터가 없다면 결과 화면으로 라우팅
  if (!data || data.length <= 0) {
    const avgTime = getAvgTime(totalTime, parseInt(score.innerText)).toFixed(2);

    // 데이터와 함계 결과 화면으로 라우팅
    onNavigate("/result", {
      score: score.innerText,
      avgTime: avgTime
    });

    // 결과 화면에서 '초기화' 버튼에 대한 이벤트 핸들링
    document.getElementById("retryButton").onclick = () => {
      onNavigate("/", null);
    };
  } else {
    // 요청 받은 단어 데이터 하나씩 꺼내서 수행
    const { second, text } = data.shift();

    // 각 데이터 셋팅
    time.innerText = second;
    question.innerText = text;
    responseTime = 0;

    // '남은 시간' 영역의 타이머 역할
    timer = setInterval(() => {
      time.innerText -= 1;
      responseTime += 1;
      // 시간이 0초가 되면 종료 후 다음 문제로 넘어간다.
      if (time.innerText === 0 || time.innerText === "0") {
        clearInterval(timer);
        score.innerText = getScore(parseInt(score.innerText), -1);
        nextQuestion();
      }
    }, 1000);
  }
};
