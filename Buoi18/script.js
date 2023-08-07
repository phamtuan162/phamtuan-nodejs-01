var text = document.getElementById("desc");
var content = text.textContent;
var arr = content.replace(/\s+/g, " ").trim().split(" ");
var currentIndex = 0;
var previousIndex = 0;
setInterval(function () {
  arr[previousIndex] = arr[previousIndex]
    .replace(`<span>`, ``)
    .replace(`</span>`, ``);

  arr[currentIndex] = `<span>${arr[currentIndex]}</span> `;

  text.innerHTML = arr.join(" ");

  previousIndex = currentIndex;

  currentIndex = (currentIndex + 1) % arr.length;
}, 1000);
