/*
Bài 1: Tính tiền taxi.
*/
function calcTaxiCost(distance) {
  var price,
    total,
    discount = 0.1;
  if (distance <= 0 || typeof distance !== "number")
    return "Nhập giá trị số hoặc >= 0";

  if (distance <= 1) {
    price = 15000;
    total = price * distance;
  } else if (distance > 1 && distance <= 5) {
    price = 13500;
    total = 15000 + price * (distance - 1);
  } else {
    price = 11000;
    total = 15000 + 4 * 13500 + price * (distance - 5);
    if (distance > 120) {
      total -= total * discount;
    }
  }
  return `Tiền taxi phải trả là: ${total} vnd`;
}

console.log(calcTaxiCost(10));

/*
Bài 2: Tính tiền điện.
*/
function calcElectricCost(kwh) {
  var price, total;
  if (kwh <= 0 || typeof kwh !== "number") return "Nhập giá trị số hoặc >= 0";
  if (kwh <= 50) {
    price = 1678;
    total = price * kwh;
  } else if (kwh >= 51 && kwh <= 100) {
    price = 1734;
    total = 50 * 1678 + price * (kwh - 50);
  } else if (kwh >= 101 && kwh <= 200) {
    price = 2014;
    total = 50 * (1678 + 1734) + price * (kwh - 100);
  } else if (kwh >= 201 && kwh <= 300) {
    price = 2536;
    total = 50 * (1678 + 1734) + 100 * 2014 + price * (kwh - 200);
  } else if (kwh >= 301 && kwh <= 400) {
    price = 2834;
    total = 50 * (1678 + 1734) + 100 * (2014 + 2536) + price * (kwh - 300);
  } else if (kwh >= 401) {
    price = 2834;
    total =
      50 * (1678 + 1734) + 100 * (2014 + 2536 + 2834) + price * (kwh - 400);
  }
  return `Tiền điện phải trả là: ${total} vnd`;
}
console.log(calcElectricCost(300));
/*
Bài 3: Tính giá trị biểu thức S = 1 * 2 + 2 * 3 + ... + n * (n + 1)
*/
var n = 3,
  s = 0;
if (n % 1 == 0 && n > 0) {
  for (let i = 1; i <= n; i++) {
    s += i * (i + 1);
  }
  console.log(`Giá trị của biểu thức S là: ${s} `);
}
/*
Bài 4: Kiểm tra số nguyên tố.
*/
n = 9;
function isPrime(n) {
  if (n <= 1 || typeof n !== "number" || n % 1 !== 0) return false;
  for (var i = 2; i < n; i++) {
    if (n % i === 0) {
      return false;
      n = i;
    }
  }
  return true;
}
if (isPrime(n)) {
  console.log(`${n} là số nguyên tố`);
} else {
  console.log(`${n} không phải là số nguyên tố`);
}
/*
Bài 5: Vẽ tam giác số với n dòng.
*/
function drawTriangle(n) {
  let currentNumber = 1,
    row = "";
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      row += currentNumber + " ";
      currentNumber++;
    }
    row += "\n";
  }
  return row;
}
console.log(drawTriangle(5));
/*
Bài 6: Vẽ bàn cờ vua..
*/
const chessboard = document.getElementById("chessboard");
let check = true;
for (let i = 1; i <= 64; i++) {
  chessboard.appendChild(
    document
      .createElement("div")
      .classList.add("cell", check ? "white" : "black")
  );
  check = !check;

  if (i % 8 === 0) {
    check = !check;
  }
}
/*
Bài 7: Vẽ bảng cửu chương từ 1 đến 10
*/
const multiplyTable = document.getElementById("multiply-table");
for (let i = 1; i <= 10; i++) {
  const row = document.createElement("tr");

  for (let j = 1; j <= 10; j++) {
    row.appendChild(document.createElement("td")).innerHTML = `${i * j}`;
  }

  multiplyTable.appendChild(row);
}

/*
Bài 8: Tính giá trị biểu thức mà không dùng vòng lặp.
*/
function getSum(n) {
  if (n === 1) {
    return 1;
  } else {
    return 1 / n + getSum(n - 1);
  }
}

const result = getSum(10);
console.log(`Giá trị của biểu thức S là: ${result}`);
