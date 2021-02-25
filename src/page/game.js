const { getScore, getData } = require("../js/game");
const { checkAnswer, getAvgTime } = require("../js/result");
import { onNavigate } from "../router.js";

/*
 * 게임화면
 */
export const game = () => {
  let data = null,
    timer = null,
    responseTime = 0,
    totalTime = 0,
    inProgress = false;

  window.startBtnClickListener = () => {
    const startButton = document.getElementById("startBtn");
    const answerInput = document.getElementById("answerInput");
    const time = document.getElementById("time");
    const score = document.getElementById("score");
    const question = document.getElementById("question");

    startButton.innerText = inProgress ? "시작" : "초기화";
    answerInput.value = inProgress ? "" : answerInput.value;
    answerInput.readOnly = inProgress;
    time.innerText = inProgress ? 0 : time.innerText;
    score.innerText = inProgress ? 0 : score.innerText;
    question.innerText = inProgress ? "문제 단어" : question.innerText;

    if (inProgress) {
      inProgress = false;
      if (timer) clearInterval(timer);
    } else {
      inProgress = true;
      answerInput.focus();
      nextQuestion();
    }
  };

  window.answerInputListener = () => {
    const answerInput = document.getElementById("answerInput");
    const score = document.getElementById("score");
    const question = document.getElementById("question");

    // 엔터 키 입력 시
    if (event.key === "Enter") {
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
  };

  // 다음 문제로 넘어가는 기능
  const nextQuestion = () => {
    const time = document.getElementById("time");
    const score = document.getElementById("score");
    const question = document.getElementById("question");

    if (timer) clearInterval(timer);

    // 남은 단어 데이터가 없다면 결과 화면으로 라우팅
    if (!data || data.length <= 0) {
      const _score = parseInt(score.innerText);
      const avgTime = getAvgTime(totalTime, _score).toFixed(2);

      // 데이터와 함계 결과 화면으로 라우팅
      onNavigate("/result", {
        score: score.innerText,
        avgTime: avgTime
      });

      inProgress = false;
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

  getData().then(result => {
    data = result;
  });

  return `
        <div class="block notice-area">
            <div class="notice-area__left">
                남은시간: <span id="time">0</span>초
            </div>
            <div class="notice-area__right">점수: <span id="score">0</span>점</div>
        </div>
        <div class="block question-area"><span id="question">문제 단어</span></div>
        <div class="block input-area">
            <input
                type="text"
                id="answerInput"
                class="input"
                placeholder="입력"
                readonly
                onkeypress={answerInputListener()}
            />
        </div>
        <div class="block button-area" id="startBtn" onclick={startBtnClickListener()}>
            시작
        </div>
    `;
};
