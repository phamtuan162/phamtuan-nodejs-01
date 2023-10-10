import { getQuestions } from "./crud.js";
export const quizizzGame = document.querySelector(".quizizzGame");
export const renderStart = () => {
  const quizizzGameStartEl = document.createElement("div");
  quizizzGameStartEl.classList.add("quizizzGame__start");

  const quizizzGameStartBodyEl = document.createElement("div");
  quizizzGameStartBodyEl.classList.add("quizizzGame__start--body");
  quizizzGameStartEl.append(quizizzGameStartBodyEl);

  const buttonStart = document.createElement("button");
  buttonStart.classList.add("quizizzGame__start--button");
  buttonStart.innerText = "Start";
  quizizzGameStartBodyEl.append(buttonStart);

  buttonStart.addEventListener("click", (e) => {
    e.preventDefault();
    buttonStart.remove();
    const countdownElement = document.createElement("div");
    countdownElement.classList.add("quizizzGame__countdown");
    const p = document.createElement("p");
    countdownElement.append(p);
    quizizzGameStartBodyEl.append(countdownElement);
    p.innerHTML = "3";
    setTimeout(() => {
      p.innerHTML = "2";
      setTimeout(() => {
        p.innerHTML = "1";
        setTimeout(() => {
          p.innerHTML = "Go!";
          quizizzGameStartEl.remove();
          getQuestions();
        }, 1000);
      }, 1000);
    }, 1000);
  });
  quizizzGame.append(quizizzGameStartEl);
};
