const timer = document.querySelector(".timer");
const counter = timer.querySelector(".counter");
const btnLink = timer.querySelector(".btn");
let isTabActive = true;
let count = 30;
let interval = 1000;
let isDisabled = true;
var lastTime;

counter.innerText = count;

document.addEventListener("visibilitychange", () => {
  isTabActive = document.visibilityState === "visible";
  if (isTabActive) requestAnimationFrame(decreasesCounter);
});

function decreasesCounter(time = performance.now()) {
  if (!isTabActive || count <= 0) return;

  if (time - (lastTime || 0) >= interval) {
    count--;
    counter.innerText = count;
    lastTime = time;
  }

  if (count === 0) {
    btnLink.removeAttribute("disabled");
    isDisabled = false;
  }

  requestAnimationFrame(decreasesCounter);
}

decreasesCounter();

btnLink.addEventListener("click", (e) => {
  if (!isDisabled) {
    e.preventDefault();
    window.location.href = "https://fullstack.edu.vn";
  }
});
