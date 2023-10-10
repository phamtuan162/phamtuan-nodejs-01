import { getQuestions } from "./crud.js";
import { quizizzGame } from "./renderStart.js";
import {
  getRandomQuestion,
  shuffleArray,
  handleChoose,
  streak,
  totalScore,
  streakPoint,
} from "./function.js";
import { renderStats } from "./renderStats.js";
let sentenceCurrent = 0;
let quizcopy = [];
let isPlay = false;

export const renderQuesttion = async (quiz) => {
  if (quiz.length) {
    if (quizcopy.length === 0) {
      quizcopy = [...quiz];
    }
    const randomQuestion = getRandomQuestion(quizcopy);
    const { question, correct_answer, incorrect_answers, score } =
      randomQuestion;
    const randomQuestionIndex = quizcopy.findIndex(
      (item) => item === randomQuestion
    );

    quizcopy.splice(randomQuestionIndex, 1);
    quizizzGame.innerText = "";
    const quizizzQuestionEl = document.createElement("div");
    quizizzQuestionEl.classList.add("quizizzGame__question");
    const quizizzGameTopEl = document.createElement("div");
    quizizzGameTopEl.classList.add("quizizzGame__top");
    console.log(streak);
    quizizzGameTopEl.innerHTML = ` <div class="quizizzGame__top--timer">
              <div class="quizizzGame__top--timer-total">
                <div class="quizizzGame__top--timer-progress"></div>
              </div>
            </div>
            <div class="quizizzGame__top--inner">
              <div class="quizizzGame__top--inner-left">
                <div class="quizizzGame__top--step">
                  <span id="current">${
                    sentenceCurrent + 1
                  }</span><span id="total">/${quiz.length}</span>
                </div>
                <div class="quizizzGame__streak">
                  <div class="streak-line-left"></div>
                  <div class="streak-line-right"></div>
                  <div class="quizizzGame__streak--status" style ="width: ${
                    streak === 0 ? 0 : (100 / 3) * streak
                  }%; padding: 0px ${streak > 0 ? 5 : 0}px">${
      streak > 0 ? "Streak" : ""
    }</div>
                 
                </div> 
                <span>${streakPoint > 0 ? "+" + streakPoint : ""}</span>
              </div>
              <div class="quizizzGame__top--inner-right">
                <div class="quizizzGame__top--score">Score: ${totalScore}</div>
              </div>
            </div>`;

    quizizzQuestionEl.append(quizizzGameTopEl);
    const quizizzGameBody = document.createElement("div");
    quizizzGameBody.classList.add("quizizzGame__body");
    const quizizzGameBodyInner = document.createElement("div");
    quizizzGameBodyInner.classList.add("quizizzGame__body--inner");

    const questionText = document.createElement("div");
    questionText.classList.add("quizizzGame__question--text");
    const h3 = document.createElement("h3");
    h3.innerHTML = question;
    questionText.append(h3);
    const h4 = document.createElement("h4");
    questionText.append(h4);

    const answers = document.createElement("div");
    answers.classList.add("quizizzGame__answer");

    let allAnswers = [];
    if (Array.isArray(correct_answer)) {
      h4.innerText = `(Choose ${correct_answer.length} correct answer(s))`;
      allAnswers = [...correct_answer, ...incorrect_answers];
    } else {
      h4.innerText = `(Choose 1 correct answer(s))`;
      allAnswers.push(correct_answer, ...incorrect_answers);
    }
    const allAnswerNews = shuffleArray(allAnswers);
    Array.from(allAnswerNews).forEach((answer) => {
      const answerEl = document.createElement("div");
      answerEl.classList.add("quizizzGame__answer--item");
      answerEl.addEventListener("click", (e) => {
        sentenceCurrent++;
        isPlay = false;
        audioEl.pause();
        handleChoose(e, correct_answer, incorrect_answers, score);
        if (sentenceCurrent === quiz.length) {
          isPlay = true;
        }
      });
      answerEl.innerText = answer;
      answers.append(answerEl);
    });

    const quizizzGameResult = document.createElement("div");
    quizizzGameResult.classList.add("quizizzGame__result");

    quizizzGameBodyInner.append(questionText);
    quizizzGameBodyInner.append(answers);
    quizizzGameBody.append(quizizzGameBodyInner);

    const audioEl = document.createElement("audio");
    audioEl.innerHTML = `
            <source type="audio/mp3" src="./media/countdown.mp3" />
          `;

    audioEl.addEventListener("timeupdate", (e) => {
      const timerProgress = document.querySelector(
        ".quizizzGame__top--timer-progress"
      );
      const rate = (audioEl.currentTime * 100) / audioEl.duration;
      timerProgress.style.width = `${100 - rate}%`;
    });

    audioEl.addEventListener("ended", (e) => {
      setTimeout(() => {
        if (sentenceCurrent < quiz.length) {
          sentenceCurrent++;
          isPlay = false;
          getQuestions();
        } else {
          sentenceCurrent = 0;
          quizizzGame.innerHTML = "";
          renderStats(quiz.length);
        }
      }, 1000);
    });

    if (!isPlay) {
      audioEl.play();
      isPlay = true;
    }

    quizizzQuestionEl.append(quizizzGameBody);
    quizizzQuestionEl.append(quizizzGameResult);
    quizizzQuestionEl.append(audioEl);
    quizizzGame.append(quizizzQuestionEl);

    if (sentenceCurrent === quiz.length) {
      sentenceCurrent = 0;
      quizizzGame.innerHTML = "";
      renderStats(quiz.length);
    }
  }
};
