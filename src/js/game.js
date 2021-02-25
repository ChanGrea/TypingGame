// 점수 셋팅 함수
export const getScore = (curScore, value) => {
  return curScore + value;
};

// 서버로부터 데이터를 가져와서 local에 셋팅
export const getData = async () => {
  const response = await fetch(
    `https://my-json-server.typicode.com/kakaopay-fe/resources/words`
  );
  const json = await response.json();

  return json;
};
