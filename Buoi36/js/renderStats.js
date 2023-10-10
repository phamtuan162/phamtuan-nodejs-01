import { quizizzGame } from "./renderStart.js";
import {
  totalScore,
  totalAnswerCorrect,
  totalAnswerIncorrect,
  handleReset,
  streakMax,
} from "./function.js";
export const renderStats = (totalQuestion) => {
  const quizizzGameStatsEl = document.createElement("div");
  quizizzGameStatsEl.classList.add("quizizzGame__stats");

  const quizizzGameStatInnerEl = document.createElement("div");
  quizizzGameStatInnerEl.classList.add("quizizzGame__stats--inner");

  const quizizzGameStatInnerTopEl = document.createElement("div");
  quizizzGameStatInnerTopEl.classList.add("quizizzGame__stats--inner-top");
  const pEl = document.createElement("p");
  if (totalAnswerCorrect > 7) pEl.innerText = "Game performance";
  else if (totalAnswerCorrect < 4) pEl.innerText = "Bad";
  else pEl.innerText = "Normal";
  quizizzGameStatInnerTopEl.append(pEl);

  const quizizzGameStatAccuracyEl = document.createElement("div");
  quizizzGameStatAccuracyEl.classList.add("quizizzGame__stats--accuracy");
  quizizzGameStatAccuracyEl.innerHTML = `<p>Accuracy</p>
                  <div class="quizizzGame__stats--accuracy-total">
                    <div
                      class="quizizzGame__stats--accuracy-progress"
                      style="width: ${
                        (totalAnswerCorrect / totalQuestion) * 100
                      }%"
                    >
                      <span>${(
                        (totalAnswerCorrect / totalQuestion) *
                        100
                      ).toFixed(2)}%</span>
                    </div>
                  </div>`;
  quizizzGameStatInnerTopEl.append(quizizzGameStatAccuracyEl);

  const quizizzGameStatPerformanceEl = document.createElement("div");
  quizizzGameStatPerformanceEl.classList.add("quizizzGame__stats--performance");
  quizizzGameStatPerformanceEl.innerHTML = ` <div class="quizizzGame__stats--performance-item">
                    <p class="number">${totalScore}</p>
                    <p class="stat">Score</p>
                  </div>
                  <div class="quizizzGame__stats--performance-item">
                    <p class="number">${streakMax}</p>
                    <p class="stat">Streak</p>
                  </div>
                  <div class="quizizzGame__stats--performance-item">
                    <p class="number">${totalAnswerCorrect}</p>
                    <p class="stat">Correct</p>
                  </div>
                  <div class="quizizzGame__stats--performance-item">
                    <p class="number">${totalAnswerIncorrect}</p>
                    <p class="stat">Incorrect</p>
                  </div>`;
  quizizzGameStatInnerTopEl.append(quizizzGameStatPerformanceEl);

  const quizizzGameStatActionEl = document.createElement("div");
  quizizzGameStatActionEl.classList.add("quizizzGame__stats--actions");

  const btnReset = document.createElement("button");
  btnReset.classList.add("quizizzGame__stats--actions-reset");
  btnReset.addEventListener("click", handleReset);
  btnReset.innerText = " Play again";
  quizizzGameStatActionEl.append(btnReset);

  quizizzGameStatInnerTopEl.append(quizizzGameStatActionEl);

  quizizzGameStatInnerEl.append(quizizzGameStatInnerTopEl);
  quizizzGameStatsEl.append(quizizzGameStatInnerEl);
  quizizzGame.append(quizizzGameStatsEl);
};
