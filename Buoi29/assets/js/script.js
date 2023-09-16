var listItem = document.querySelector(".list");
var items = listItem.querySelectorAll(".list-item");
const modules = ["Nhập môn lập trình web", "Ngôn ngữ HTML", "Ngôn ngữ CSS"];

var updateItemNumber = () => {
  const itemNotActive = listItem.querySelectorAll(".list-item:not(.active)");
  itemNotActive.forEach(function (item, index) {
    const itemContent = item.querySelector("span").textContent;
    if (!modules.includes(itemContent)) {
      item.innerHTML = `Bài:  ${index + 1} <span>${itemContent}</span>`;
    }
  });
};

var initSortableList = (e) => {
  e.preventDefault();
  const itemDragging = listItem.querySelector(".dragging");
  const itemNotDraggings = listItem.querySelectorAll(
    ".list-item:not(.dragging)"
  );
  let itemDraggingTo = Array.from(itemNotDraggings).find((itemNotDragging) => {
    return (
      e.clientY <= itemNotDragging.offsetTop + itemNotDragging.offsetHeight / 2
    );
  });
  listItem.insertBefore(itemDragging, itemDraggingTo);
};

items.forEach(function (item) {
  const itemContent = item.querySelector("span").textContent;
  item.setAttribute("draggable", "true");

  item.addEventListener("dragstart", () => {
    item.classList.add("dragging");
  });
  item.addEventListener("dragend", () => {
    item.classList.remove("dragging");
    updateItemNumber();
  });

  if (modules.includes(itemContent)) {
    item.classList.add("active");
  }
});

listItem.addEventListener("dragover", initSortableList);
