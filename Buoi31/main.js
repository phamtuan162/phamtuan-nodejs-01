var timer = document.querySelector(".timer");
var counter = timer.querySelector(".counter");
var btnLink = timer.querySelector(".btn");
let isTabActive = true;
let count = 10;
let isDisabled = true;
let lastTimestamp = null;
const interval = 1000;
counter.innerText = count;

document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "visible") {
    isTabActive = true;
    requestAnimationFrame(decreasesCounter);
  } else {
    isTabActive = false;
  }
});

function decreasesCounter(timestamp) {
  if (isTabActive) {
    if (!timestamp) {
      timestamp = performance.now();
    }

    if (!lastTimestamp) {
      lastTimestamp = timestamp;
    }

    if (timestamp - lastTimestamp >= interval) {
      count--;
      counter.innerText = count;
      lastTimestamp = timestamp;
    }

    if (count === 0) {
      btnLink.removeAttribute("disabled");
      isDisabled = false;
    }
  }

  if (count > 0) {
    requestAnimationFrame(decreasesCounter);
  }
}

decreasesCounter();

btnLink.addEventListener("click", function (e) {
  if (!isDisabled) {
    e.preventDefault();
    window.location.href = "https://fullstack.edu.vn";
  }
});
