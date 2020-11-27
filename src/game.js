/*
 * 게임화면
 */
export const game = () => `
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
        />
    </div>
    <div class="block button-area" id="startBtn">
        시작
    </div>
`;
