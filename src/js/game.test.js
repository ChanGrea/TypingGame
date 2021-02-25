const { getScore, getData } = require("./game");

test("Get Score", () => {
  let curScore = 0;
  expect(getScore(curScore, 1)).toBe(1);
  expect(getScore(curScore, -1)).toBe(-1);
});

test("Get Data From Remote", () => {
  let response = null;
  getData().then(result => {
    response = result;
    expect(response).toEqual(expect.any(Array));
    expect(response.length > 0).toBe(true);
  });
});
