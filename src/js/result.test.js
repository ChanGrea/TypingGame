const { checkAnswer, getAvgTime } = require("./result");

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
