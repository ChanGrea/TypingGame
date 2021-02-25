// 정답 판별 함수
export const checkAnswer = (question, userInput) => {
  return question === userInput;
};

// 평균 입력 시간 반환 함수
export const getAvgTime = (totalTime, totalAnswer) => {
  return totalTime / totalAnswer;
};
