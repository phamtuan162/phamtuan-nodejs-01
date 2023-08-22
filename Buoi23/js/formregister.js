const formRegister = document.querySelector(".form-register");
const inputFullNameRegister = document.querySelector(
  ".form-register #fullname"
);
const errFullNameRegister = document.querySelector(
  ".form-register .err-fullname"
);
const inputEmailRegister = document.querySelector(".form-register #email");
const errEmailRegister = document.querySelector(".form-register .err-email");
const inputPasswordRegister = document.querySelector(
  ".form-register #password"
);
const errPasswordRegister = document.querySelector(
  ".form-register .err-password"
);
const submitRegister = document.querySelector(".submit-register");
const eyeRegister = document.querySelector(
  ".form-register .show-hide--password i"
);

// Form Register
btnRegister.addEventListener("click", function () {
  contentRegister.classList.remove("hidden");
  contentLogin.classList.add("hidden");
  btnRegister.classList.add("active");
  btnLogin.classList.remove("active");

  resetFormFields(inputFullNameRegister, errFullNameRegister);
  resetFormFields(inputEmailRegister, errEmailRegister);
  resetFormFields(inputPasswordRegister, errPasswordRegister);
});

eyeRegister.addEventListener("click", function () {
  viewPassword(inputPasswordRegister, eyeRegister);
});

inputFullNameRegister.addEventListener("blur", function () {
  if (
    !inputEmailRegister.value &&
    !inputPasswordRegister.value &&
    !inputFullNameRegister.value
  ) {
    errEmailRegister.innerText = "Vui lòng nhập thông tin";
    errPasswordRegister.innerText = "Vui lòng nhập thông tin";
    inputEmailRegister.parentElement.classList.add("error");
    inputPasswordRegister.parentElement.classList.add("error");
    errFullNameRegister.innerText = "Vui lòng nhập thông tin";
    inputFullNameRegister.parentElement.classList.add("error");
  }

  if (inputFullNameRegister.value) {
    errFullNameRegister.innerText = "";
    inputFullNameRegister.parentElement.classList.remove("error");
  }
});
inputFullNameRegister.addEventListener("input", function () {
  if (!inputEmailRegister.value) {
    errFullNameRegister.innerText = "Vui lòng nhập thông tin";
    inputFullNameRegister.parentElement.classList.add("error");
  } else {
    errFullNameRegister.innerText = "";
    inputFullNameRegister.parentElement.classList.remove("error");
  }
  if (inputFullNameRegister.value === "") {
    errFullNameRegister.innerText = "Vui lòng nhập thông tin";
    inputFullNameRegister.parentElement.classList.add("error");
  }

  if (inputFullNameRegister.value) {
    errFullNameRegister.innerText = "";
    inputFullNameRegister.parentElement.classList.remove("error");
    if (inputEmailRegister.value === "") {
      errEmailRegister.innerText = "Vui lòng nhập thông tin";
      inputEmailRegister.parentElement.classList.add("error");
    }

    if (inputPasswordRegister.value === "") {
      errPasswordRegister.innerText = "Vui lòng nhập thông tin";
      inputPasswordRegister.parentElement.classList.add("error");
    }
  }
});

inputEmailRegister.addEventListener("blur", function () {
  if (
    !inputEmailRegister.value &&
    !inputPasswordRegister.value &&
    !inputFullNameRegister.value
  ) {
    errEmailRegister.innerText = "Vui lòng nhập thông tin";
    errPasswordRegister.innerText = "Vui lòng nhập thông tin";
    inputEmailRegister.parentElement.classList.add("error");
    inputPasswordRegister.parentElement.classList.add("error");
    errFullNameRegister.innerText = "Vui lòng nhập thông tin";
    inputFullNameRegister.parentElement.classList.add("error");
  }
});
inputEmailRegister.addEventListener("input", function () {
  if (isValidEmail(inputEmailRegister.value)) {
    errEmailRegister.innerText = "";
    inputEmailRegister.parentElement.classList.remove("error");
    if (inputPasswordRegister.value === "") {
      errPasswordRegister.innerText = "Vui lòng nhập thông tin";
      inputPasswordRegister.parentElement.classList.add("error");
    }
  } else {
    errEmailRegister.innerText = "Vui lòng nhập đúng định dạng email";
    errPasswordRegister.innerText = "Vui lòng nhập thông tin";
    inputEmailRegister.parentElement.classList.add("error");
    inputPasswordRegister.parentElement.classList.add("error");
    errFullNameRegister.innerText = "Vui lòng nhập thông tin";
    inputFullNameRegister.parentElement.classList.add("error");
  }

  if (inputEmailRegister.value === "") {
    errEmailRegister.innerText = "Vui lòng nhập thông tin";
  }

  if (inputEmailRegister.value === "" && inputPasswordRegister.value) {
    errPasswordRegister.innerText = "";
    inputPasswordRegister.parentElement.classList.remove("error");
  }

  if (inputEmailRegister.value === "" && inputFullNameRegister.value) {
    errFullNameRegister.innerText = "";
    inputFullNameRegister.parentElement.classList.remove("error");
  }

  if (
    inputEmailRegister.value &&
    inputPasswordRegister.value &&
    inputFullNameRegister.value
  ) {
    errPasswordRegister.innerText = "";
    inputPasswordRegister.parentElement.classList.remove("error");
    errFullNameRegister.innerText = "";
    inputFullNameRegister.parentElement.classList.remove("error");
  }

  if (inputEmailRegister.value && inputFullNameRegister.value) {
    errFullNameRegister.innerText = "";
    inputFullNameRegister.parentElement.classList.remove("error");
  }
});

inputPasswordRegister.addEventListener("blur", function () {
  if (
    !inputEmailRegister.value &&
    !inputPasswordRegister.value &&
    !inputFullNameRegister.value
  ) {
    errEmailRegister.innerText = "Vui lòng nhập thông tin";
    errPasswordRegister.innerText = "Vui lòng nhập thông tin";
    inputEmailRegister.parentElement.classList.add("error");
    inputPasswordRegister.parentElement.classList.add("error");
    errFullNameRegister.innerText = "Vui lòng nhập thông tin";
    inputFullNameRegister.parentElement.classList.add("error");
  }

  if (inputPasswordRegister.value) {
    errPasswordRegister.innerText = "";
    inputPasswordRegister.parentElement.classList.remove("error");
  }

  if (isValidPassword(inputPasswordRegister)) {
    errPasswordRegister.innerText =
      "Mật khẩu tối thiểu 8 ký tự,1 chữ cái in hoa và 1 chữ số";
    inputPasswordRegister.parentElement.classList.add("error");
  }
  if (inputPasswordRegister.value.length === 0) {
    errPasswordRegister.innerText = "Vui lòng nhập thông tin";
    inputPasswordRegister.parentElement.classList.add("error");
  }
});
inputPasswordRegister.addEventListener("input", function () {
  if (!inputEmailRegister.value) {
    errPasswordRegister.innerText = "Vui lòng nhập thông tin";
    inputPasswordRegister.parentElement.classList.add("error");
  } else {
    errPasswordRegister.innerText = "";
    inputPasswordRegister.parentElement.classList.remove("error");
  }
  if (inputPasswordRegister.value === "") {
    errPasswordRegister.innerText = "Vui lòng nhập thông tin";
    inputPasswordRegister.parentElement.classList.add("error");
  }

  if (inputPasswordRegister.value) {
    errPasswordRegister.innerText = "";
    inputPasswordRegister.parentElement.classList.remove("error");
    if (inputEmailRegister.value === "") {
      errEmailRegister.innerText = "Vui lòng nhập thông tin";
      inputEmailRegister.parentElement.classList.add("error");
    }
    if (inputFullNameRegister.value === "") {
      errFullNameRegister.innerText = "Vui lòng nhập thông tin";
      inputFullNameRegister.parentElement.classList.add("error");
    }
  }

  if (isValidPassword(inputPasswordRegister)) {
    errPasswordRegister.innerText =
      "Mật khẩu tối thiểu 8 ký tự,1 chữ cái in hoa và 1 chữ số";
    inputPasswordRegister.parentElement.classList.add("error");
  }
  if (inputPasswordRegister.value.length === 0) {
    errPasswordRegister.innerText = "Vui lòng nhập thông tin";
    inputPasswordRegister.parentElement.classList.add("error");
  }
});
