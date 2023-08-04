var text = document.getElementById("desc");
var content = text.textContent;
var arr = content.replace(/\s+/g, " ").trim().split(" ");
var currentIndex = 0;
var previousIndex = 0;
var textColor = "red";
setInterval(function () {
  arr[previousIndex] = arr[previousIndex].replace(textColor, "");

  arr[currentIndex] = `<span class="${textColor}">${arr[currentIndex]}</span> `;

  text.innerHTML = arr.join(" ");

  previousIndex = currentIndex;

  currentIndex = (currentIndex + 1) % arr.length;
}, 1000);
