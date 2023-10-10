import { getQuestions } from "./crud.js";
import { renderStart, quizizzGame } from "./renderStart.js";
export let totalScore = 0;
export let streak = 0;
export let streakPoint = 0;
export let limitPointOne = 100;
export let totalAnswerCorrect = 0;
export let totalAnswerIncorrect = 0;
export let streakMax = 0;
let answerChoose = [];
export const getRandomQuestion = (data) => {
  if (data.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * data.length);
  const randomQuestion = data[randomIndex];
  return randomQuestion;
};
export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
export function handleChoose(e, correct_answers, incorrect_answers, score) {
  e.preventDefault();
  const quizizzGameResultEl = document.querySelector(".quizizzGame__result");
  const el = e.target;
  const value = el.innerText;
  answerChoose.push(value);
  const correctAnswers = Array.isArray(correct_answers)
    ? [...correct_answers]
    : [correct_answers];
  if (correctAnswers.includes(value)) {
    totalAnswerCorrect++;
    el.style.backgroundColor = "green";
    const check = correctAnswers.every((item) => answerChoose.includes(item));
    if (check) {
      quizizzGameResultEl.innerText = "Correct";
      quizizzGameResultEl.style.backgroundColor = "green";
      if (streakPoint > 0) {
        totalScore += score;
        totalScore += streakPoint;
      } else {
        totalScore += score;
      }
      streakPoint += limitPointOne;
      if (streak === 2) streakMax++;
      if (streak < 3) streak++;

      setTimeout(() => {
        getQuestions();
      }, 1000);
    }
  } else {
    totalAnswerIncorrect++;
    quizizzGameResultEl.innerText = "Incorrect";
    quizizzGameResultEl.style.backgroundColor = "red";
    streak = 0;
    streakPoint = 0;
    el.style.backgroundColor = "red";
    const els = e.target.parentElement.children;
    Array.from(els).forEach((el) => {
      if (correctAnswers.includes(el.innerText)) {
        el.style.backgroundColor = "green";
      }
    });

    setTimeout(() => {
      getQuestions();
    }, 1000);
  }
}

export const handleReset = () => {
  quizizzGame.innerHTML = "";
  totalScore = 0;
  streak = 0;
  streakPoint = 0;
  totalAnswerCorrect = 0;
  totalAnswerIncorrect = 0;
  streakMax = 0;
  renderStart();
};
