const { getScore } = require("./game");

test("Get Score", () => {
  let curScore = 0;
  expect(getScore(curScore, 1)).toBe(1);
  expect(getScore(curScore, -1)).toBe(-1);
});
