var controls = document.querySelector(".controls");
var content = document.querySelector("#content");
var controlBtns = controls.querySelectorAll(".control-btn");
var dropdownToggle = controls.querySelector(".dropdown-toggle");
var dropdownMenu = controls.querySelector(".dropdown-menu");
var dropdownItems = dropdownMenu.querySelectorAll(".dropdown-item");

var fileName = controls.querySelector("#filename-input");
var count = document.querySelector(".count");

function resetEditor() {
  fileName.value = "untitled";
  content.textContent = "";
}

function saveTextAsTxt() {
  const blob = new Blob([content.innerText]);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${fileName.value}.txt`;
  link.click();
}

function saveAsPdf() {
  html2pdf(content).save(fileName.value);
}

var handlefile = function (value) {
  const action = value.id.split("-")[0];
  dropdownMenu.classList.remove("show");
  switch (action) {
    case "new":
      resetEditor();
      break;
    case "txt":
      saveTextAsTxt();
      break;
    case "pdf":
      saveAsPdf();
      break;
    default:
      break;
  }
};
dropdownToggle.addEventListener("click", function () {
  if (dropdownMenu.classList.contains("show")) {
    dropdownMenu.classList.remove("show");
  } else {
    dropdownMenu.classList.add("show");
  }
});

const modifyText = function (command, defaultUi, value) {
  document.execCommand(command, defaultUi, value);
};

controlBtns.forEach(function (controlBtn) {
  if (controlBtn.id === "color-btn") {
    controlBtn.addEventListener("change", function () {
      modifyText("foreColor", false, controlBtn.value);
    });
  } else {
    const action = controlBtn.id.split("-")[0];
    controlBtn.addEventListener("click", function () {
      modifyText(action, false, null);
    });
  }
});

dropdownItems.forEach(function (dropdownItem) {
  dropdownItem.addEventListener("click", function () {
    handlefile(this);
  });
});

content.addEventListener("input", function () {
  const wordCount = count.querySelector("span:first-child");
  const charCount = count.querySelector("span:last-child");
  var text = content.textContent.trim("");
  const words = text.split(/\s+/);

  const numWords = words.length;
  const numChars = text.length;

  wordCount.textContent = `Số từ : ${numWords}`;
  charCount.textContent = `Số ký tự : ${numChars}`;
});
