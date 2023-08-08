//Bai 1
var array = [4, 2, 9, 5, 9, 6, 9];
if (array.length !== 0) {
  var sortArray = [...array].sort(function (next, prev) {
    return next - prev;
  });
  var min = sortArray[0];
  var max = sortArray[array.length - 1];
  console.log(
    `Số lớn nhất trong mảng là : ${max} và ở vị trí ${array.indexOf(max)} `
  );
  console.log(
    `Số nhỏ nhất trong mảng là : ${min} và ở vị trí ${array.indexOf(min)}`
  );
} else {
  console.log("Mảng ko có phần tử nào");
}

//Bài 2

function isPrime(number) {
  if (number % 1 !== 0 || number < 2 || (number % 2 === 0 && number !== 2))
    return false;
  for (var i = 2; i <= Math.sqrt(number); i++)
    if (number % i === 0) return false;
  return true;
}
var sumPrime = 0;
var countPrime = 0;
if (array.length !== 0) {
  for (var i = 0; i < array.length; i++) {
    if (isPrime(array[i])) {
      sumPrime += array[i];
      countPrime++;
    }
  }
  if (countPrime !== 0) {
    console.log(
      `Trung bình các số nguyên tố trong mảng là ${sumPrime / countPrime}`
    );
  } else {
    console.log("Không có số nguyên tố nào trong mảng");
  }
} else {
  console.log("Mảng ko có phần tử nào");
}

//Bài 3

if (array.length !== 0) {
  var result = array.filter(function (item, index) {
    return array.indexOf(item) === index;
  });
  console.log(result);
} else {
  console.log(` Mảng không có phần tử nào`);
}

//Bài 4
var array = [5, 1, 9, 8, 10];
var element = 4;
var indexAdd = 0;

if (array.length !== 0) {
  array.sort(function (next, prev) {
    return next - prev;
  });

  for (var i in array) {
    if (array[i] < element) {
      indexAdd++;
    }
  }

  array.splice(indexAdd, 0, element);
  console.log(array);
} else {
  console.log(`Mảng không có phần tử nào`);
}
