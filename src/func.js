// 정답 판별 함수
const checkAnswer = (question, userInput) => {
  return question === userInput;
};

// 점수 셋팅 함수
const getScore = (curScore, value) => {
  return curScore + value;
};

// 평균 입력 시간 반환 함수
const getAvgTime = (totalTime, totalAnswer) => {
  return totalTime / totalAnswer;
};

module.exports = { getScore, checkAnswer, getAvgTime };
