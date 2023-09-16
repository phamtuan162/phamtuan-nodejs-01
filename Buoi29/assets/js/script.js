var listItem = document.querySelector(".list");
const data = [
  {
    stt: 3,
    module: "Ngôn ngữ CSS",
    topics: [
      "Giới thiệu ngôn ngữ CSS - Cách viết CSS",
      "Cấu trúc CSS - Bộ chọn (Selector) trong CSS - Phần 1",
      "Bộ chọn CSS (Tiếp theo) - Các thuộc tính định dạng văn bản",
      "Chồng chéo CSS và thứ tự ưu tiên trong CSS",
      "Thuộc tính Background",
    ],
  },
  {
    stt: 1,
    module: "Nhập môn lập trình web",
    topics: [
      "Giới thiệu khóa học HTML, CSS",
      "Nhập môn lập trình web - Phần 1",
      "Nhập môn lập trình web - Phần 2",
      "Công cụ - Phần mềm cần chuẩn bị",
    ],
  },
  {
    stt: 4,
    module: "Responsive Web Design",
    topics: [
      "Tổng quan về Responsive Web Design",
      "Hướng dẫn code Media Queries CSS3",
      "Tối ưu Responsive Grid System - Phần 1",
      "Tối ưu Responsive Grid System - Phần 2",
      "Xây dựng menu responsive chỉ với CSS",
    ],
  },
  {
    stt: 2,
    module: "Ngôn ngữ HTML",
    topics: ["Giới thiệu về ngôn ngữ HTML", "HTML cơ bản - Phần 2"],
  },
];
var updateItemNumber = () => {
  const itemNotActive = listItem.querySelectorAll(".list-item:not(.active)");
  itemNotActive.forEach(function (item, index) {
    const itemContent = item.querySelector("span").textContent;
    item.innerHTML = `Bài ${index + 1}: <span>${itemContent}</span>`;
  });
};

var initSortableList = (e) => {
  e.preventDefault();
  const itemDragging = listItem.querySelector(".dragging");
  const itemNotDraggings = listItem.querySelectorAll(
    ".list-item:not(.dragging)"
  );
  let itemDraggingNext = Array.from(itemNotDraggings).find(
    (itemNotDragging) => {
      return (
        e.clientY <=
        itemNotDragging.offsetTop + itemNotDragging.offsetHeight / 2
      );
    }
  );
  listItem.insertBefore(itemDragging, itemDraggingNext);
};

function renderData() {
  var indexTopic = 0;
  data.sort((a, b) => a.stt - b.stt);
  data.forEach((moduleData) => {
    const moduleItem = document.createElement("div");
    moduleItem.classList.add("list-item", "active");
    moduleItem.innerHTML = `Module ${moduleData.stt}: <span>${moduleData.module}</span>`;
    listItem.appendChild(moduleItem);
    if (moduleData.topics) {
      moduleData.topics.forEach((topic) => {
        const topicItem = document.createElement("div");
        topicItem.classList.add("list-item");
        topicItem.innerHTML = `Bài ${indexTopic + 1}: <span>${topic}</span>`;
        listItem.appendChild(topicItem);
        indexTopic++;
      });
    }
  });
}

renderData();

var items = listItem.querySelectorAll(".list-item");
items.forEach((item) => {
  item.setAttribute("draggable", "true");

  item.addEventListener("dragstart", () => {
    item.classList.add("dragging");
  });
  item.addEventListener("dragend", () => {
    item.classList.remove("dragging");
    updateItemNumber();
  });
});

listItem.addEventListener("dragover", initSortableList);
