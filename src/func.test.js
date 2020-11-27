const { getScore, checkAnswer, getAvgTime } = require("./func");

test("Get Score", () => {
  let curScore = 0;
  expect(getScore(curScore, 1)).toBe(1);
  expect(getScore(curScore, -1)).toBe(-1);
});

test("Check answer with question", () => {
  const question = "kakaopay";
  expect(checkAnswer(question, "kakaopay")).toBeTruthy();
  expect(checkAnswer(question, "kakao")).toBeFalsy();
});

test("Get user's Average Time", () => {
  const totalTime = 36;
  const totalAnswer = 12;
  expect(getAvgTime(totalTime, totalAnswer)).toBe(3);
});
