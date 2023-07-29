/*
Bài 1: Hoán vị 2 số.
Input: Cho trước 2 số a, b
Output: Thực hiện hoán vị 2 số không dùng biến trung gian.
*/
var a = 6,
  b = 7;

a += b;
b = a - b;
a = a - b;

console.log(`Kết quả sau khi hoán vị là: ${a} và ${b}`);
/*
Bài 2: Thực hiện phép toán: S = 10 + 20 + 5 ^ 10 / 2
*/

var S = 10 + 20 + 5 ** 10 / 2;

console.log(`Kết quả phép tính là : S = ${S}`);

/*
Bài 3:
Input: Cho trước 3 số a, b, c
Output: Tìm số lớn nhất trong 3 số và hiển thị kết quả.
*/

var a = 7,
  b = 5,
  c = 2,
  max = a;
if (b >= max) {
  max = b;
} else if (c >= max) {
  max = c;
}
console.log(`Số lớn nhất là ${max}`);

/*
Bài 4:
Input: Cho trước 2 số a, b
Output: Kiểm tra 2 số cùng dấu hay không và hiển thị kết quả ra màn hình
*/
var a = 2,
  b = -3;
if (a * b > 0) {
  console.log(`Hai số đã cho cùng dấu`);
} else if (a * b < 0) {
  console.log(`Hai số đã cho không cùng dấu`);
} else {
  console.log(`Không kiểm tra được do 1 trong 2 số bằng 0`);
}

/*
Bài 5:
Input: Cho trước 3 số a, b,c
Output: Thực hiện đổi chỗ 3 số a, b, c sao cho 3 số có thứ tự tăng dần
*/

var a = 8,
  b = 3,
  c = 5,
  temp;
if (a > b) {
  temp = a;
  a = b;
  b = temp;
}
if (a > c) {
  temp = a;
  a = c;
  c = temp;
}
if (b > c) {
  temp = b;
  b = c;
  c = temp;
}

console.log(`Kết quả sắp xếp theo thứ tự tăng dần là: ${a}, ${b}, ${c} `);
