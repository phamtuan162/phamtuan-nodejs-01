// Bài 1
var arrA = [1, 4, 3, 2];
var arrB = [5, 2, 6, 7, 1];
if (Array.isArray(arrA) && Array.isArray(arrB)) {
  var result = arrA.reduce(function (prev, current) {
    return !arrB.includes(current) && prev.push(current), prev;
  }, []);

  if (result.length === 0) {
    console.log(`Hai mảng đã cho không có phần tử nào giống nhau`);
  } else {
    console.log(`Các phần tử giống nhau của 2 mảng là:`, result);
  }
} else {
  console.log(`Vui lòng nhập lại mảng.`);
}
// Bài 2
var arr = [0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]];
if (Array.isArray(arr)) {
  function flattenArray(arr) {
    return arr.reduce(function (prev, current) {
      if (Array.isArray(current)) {
        return prev.concat(flattenArray(current));
      } else {
        return prev.concat(current);
      }
    }, []);
  }
  console.log(`Mảng sau khi đã được làm phẳng:`, flattenArray(arr));
} else {
  console.log(`Vui lòng nhập lại mảng.`);
}

// Bài 3
var arr = [
  ["a", 1, true],
  ["b", 2, false],
];
var arrFlat = flattenArray(arr);
var result = [];
for (var i in arrFlat) {
  var value = arrFlat[i];
  var type = typeof value;
  if (!result[type]) {
    result[type] = [];
  }

  result[type].push(value);
}
console.log(result);

// Bài 4
const listContainer = document.querySelector(".list");
var lists = [
  {
    img: "img-1.jpg",
    title: "Tiêu đề bài viết 1",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    img: "img-2.jpg",
    title: "Tiêu đề bài viết 2",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    img: "img-3.jpg",
    title: "Tiêu đề bài viết 3",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];
var html = lists.map(function (item, index) {
  return `    <article class="item">
          <figure class="item__img--wrapper">
            <img src="./img/${item.img}" alt="" class="item__img" />
          </figure>
          <div class="item__content">
            <h2 class="item__tittle">${item.title}</h2>
            <p class="item__desc">
              ${item.desc}
            </p>
          </div>
        </article>`;
});
listContainer.innerHTML = html.join("");
