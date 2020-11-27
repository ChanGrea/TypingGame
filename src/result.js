/*
 * 결과 화면
 */

export const resultTemplate = model => `
    <div class="block notice-area">
        Mission Complete!
    </div>
    <div class="block result__score-area">
        당신의 점수는 <span>\u00A0${model.score}</span>점입니다.
    </div>
    <div class="block result__time-area">
        단어당 평균 답변 시간은 <span>\u00A0${model.avgTime}</span>초입니다.
    </div>
    <div id="retryButton" class="block button-area">
        다시 시작
    </div>
`;
