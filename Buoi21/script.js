// Bài 1
var errors = {
  name: {
    required: "Vui lòng nhập họ tên",
    min: "Họ tên phải từ 5 ký tự",
  },
  email: {
    email: "Định dạng email không hợp lệ",
    unique: "Email đã có người sử dụng",
    required: "Vui lòng nhập địa chỉ email",
  },
  password: {
    required: "Vui lòng nhập mật khẩu",
    same: "Mật khẩu phải khớp với mật khẩu nhập lại",
  },
};
function getError(field) {
  var errorFirst = errors[field];
  if (errorFirst) {
    return Object.values(errorFirst)[0];
  } else {
    return "không tồn tại lỗi";
  }
}
getError("name"); //Vui lòng nhập họ tên
getError("email"); //Định dạng email không hợp lệ

//Bài 2

var Person = function (name, age, address) {
  this.name = name;
  this.age = age;
  this.address = address;
};
function createCustomers(clients) {
  return clients
    .map(function (client) {
      const fullName = client.name.split(" ");
      const firstName = fullName[0];
      const lastName = fullName[fullName.length - 1];
      const user = new Person(client.name, client.age, client.address);
      user.shortName = `${firstName} ${lastName}`;
      return user;
    })
    .sort(function (next, prev) {
      return next.age - prev.age;
    });
}
const customers = [
  { name: "Nguyễn Văn A", age: 11, address: "Ha Noi" },
  { name: "Nguyễn Văn B", age: 2, address: "Hai Phong" },
  { name: "Nguyễn Văn C", age: 12, address: "TP.HCM" },
];

const result = createCustomers(customers);
console.log(result);

// Bài 3
var User = function (name, password, email) {
  this.name = name;
  this.password = password;
  this.email = email;
};
// Hàm register
function handleRegister(name, password, email) {
  if (!name || !password || !email) {
    return "Nhập chưa đủ các trường";
  }
  const userExists = data.some(function (user) {
    return user.email === email;
  });
  if (userExists) {
    return "Địa chỉ email đã được sử dụng";
  }

  const newUser = new User(name, password, email);
  newUser.role = "user";
  data.push(newUser);

  return data;
}
// Hàm login
function handleLogin(email, password) {
  const foundUser = data.find(function (user) {
    return user.email === email && user.password === password;
  });
  return foundUser ? foundUser : "Thông tin đăng nhập không hợp lệ";
}

const data = [];
var dataRegister = handleRegister(
  "Nguyen Van A",
  "123456",
  "nguyenvana@email.com"
);
var dataRegister = handleRegister(
  "Nguyen Van B",
  "1234567",
  "nguyenvanb@email.com"
);
console.log(data);

const dataLogin = handleLogin("nguyenvanb@email.com", "1234567");
console.log(dataLogin);
