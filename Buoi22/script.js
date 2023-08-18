// Bài 1
const isNumber = (value) => {
  const num = Number(value);
  return !isNaN(num) && isFinite(num);
};
function sum(...args) {
  let total = 0;
  for (const arg of args) {
    if (isNumber(arg)) {
      total += Number(arg);
    } else {
      return "Lỗi: Tham số truyền vào không hợp lệ!";
    }
  }

  return total;
}
console.log(sum("12", 6, "45", 1, 2));
// Bài 2

Object.prototype.getCurrency = function (unit) {
  var number = this.valueOf();
  if (isNumber(number)) {
    return Number(number).toLocaleString("vi") + " " + unit;
  } else {
    return "Không hợp lệ!";
  }
};
//Case 1
var price = 12000;
console.log(price.getCurrency("đ")); //Hiển thị: 12,000 đ

//Case 2
var price = "12000000";
console.log(price.getCurrency("đ")); //Hiển thị: 12,000,000 đ

// Bài 3

var data = [
  {
    id: 1,
    name: "Chuyên mục 1",
    parent: 0,
  },
  {
    id: 3,
    name: "Chuyên mục 3",
    parent: 0,
  },
  {
    id: 2,
    name: "Chuyên mục 2",
    parent: 0,
  },

  {
    id: 4,
    name: "Chuyên mục 2.1",
    parent: 2,
  },

  {
    id: 5,
    name: "Chuyên mục 2.2",
    parent: 2,
  },
  {
    id: 6,
    name: "Chuyên mục 2.3",
    parent: 2,
  },
  {
    id: 7,
    name: "Chuyên mục 3.1",
    parent: 3,
  },
  {
    id: 8,
    name: "Chuyên mục 3.2",
    parent: 3,
  },
  {
    id: 9,
    name: "Chuyên mục 3.3",
    parent: 3,
  },
  {
    id: 10,
    name: "Chuyên mục 2.2.1",
    parent: 5,
  },
  {
    id: 11,
    name: "Chuyên mục 2.2.2",
    parent: 5,
  },
];
function findParent(arr, parentId) {
  for (const item of arr) {
    if (item.id === parentId) {
      return item;
    } else if (item.children) {
      const foundParent = findParent(item.children, parentId);
      if (foundParent) {
        return foundParent;
      }
    }
  }
  return null;
}
function convertToNestedArray(arr) {
  var result = [];
  arr.forEach((item) => {
    if (item.parent === 0) {
      item.children = [];
      result.push(item);
      result.sort((a, b) => a.id - b.id);
    } else {
      const parentItem = findParent(result, item.parent);
      if (parentItem) {
        if (!parentItem.children) {
          parentItem.children = [];
        }

        parentItem.children.push(item);
        parentItem.children.sort((a, b) => a.id - b.id);
      }
    }
  });
  return result;
}
console.log(convertToNestedArray(data));
console.log(data);
// Bài 4

Array.prototype.reduce2 = function (callback, result) {
  let i = 0;
  if (arguments.length < 2) {
    result = this[0];
    i = 1;
  }

  for (; i < this.length; i++) {
    result = callback(result, this[i], i, this);
  }
  return result;
};

var arr = [1, 2, 3, 4, 5];
var result = arr.reduce2((prev, current) => {
  return prev + current;
}, 0);
console.log(result);
