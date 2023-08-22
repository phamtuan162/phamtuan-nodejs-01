const formLogin = document.querySelector(".form-login");
const inputEmailLogin = document.querySelector(".form-login #email");
const inputPasswordLogin = document.querySelector(".form-login #password");
const errEmail = document.querySelector(".err-email");
const errPassword = document.querySelector(".err-password");
const submitLogin = document.querySelector(".submit-login");
const eyeLogin = document.querySelector(".form-login .show-hide--password i");

// Form Login
btnLogin.addEventListener("click", function () {
  contentLogin.classList.remove("hidden");
  contentRegister.classList.add("hidden");
  btnLogin.classList.add("active");
  btnRegister.classList.remove("active");

  resetFormFields(inputEmailLogin, errEmail);
  resetFormFields(inputPasswordLogin, errPassword);
});

eyeLogin.addEventListener("click", function () {
  viewPassword(inputPasswordLogin, eyeLogin);
});
inputEmailLogin.addEventListener("input", function () {
  if (isValidEmail(inputEmailLogin.value)) {
    errEmail.innerText = "";
    inputEmailLogin.parentElement.classList.remove("error");
    if (inputPasswordLogin.value === "") {
      errPassword.innerText = "Vui lòng nhập thông tin";
      inputPasswordLogin.parentElement.classList.add("error");
    }
  } else {
    errEmail.innerText = "Vui lòng nhập đúng định dạng email";
    errPassword.innerText = "Vui lòng nhập thông tin";
    inputEmailLogin.parentElement.classList.add("error");
    inputPasswordLogin.parentElement.classList.add("error");
  }

  if (inputEmailLogin.value === "") {
    errEmail.innerText = "Vui lòng nhập thông tin";
  }

  if (inputEmailLogin.value === "" && inputPasswordLogin.value) {
    errPassword.innerText = "";
    inputPasswordLogin.parentElement.classList.remove("error");
  }

  if (!isValidEmail(inputEmailLogin.value) && inputPasswordLogin.value) {
    errPassword.innerText = "";
    inputPasswordLogin.parentElement.classList.remove("error");
  }
});
inputEmailLogin.addEventListener("blur", function () {
  if (!inputEmailLogin.value && !inputPasswordLogin.value) {
    errEmail.innerText = "Vui lòng nhập thông tin";
    errPassword.innerText = "Vui lòng nhập thông tin";
    inputEmailLogin.parentElement.classList.add("error");
    inputPasswordLogin.parentElement.classList.add("error");
  }
});

inputPasswordLogin.addEventListener("input", function () {
  if (!inputEmailLogin.value) {
    errPassword.innerText = "Vui lòng nhập thông tin";
    inputPasswordLogin.parentElement.classList.add("error");
  } else {
    errPassword.innerText = "";
    inputPasswordLogin.parentElement.classList.remove("error");
  }
  if (inputPasswordLogin.value === "") {
    errPassword.innerText = "Vui lòng nhập thông tin";
    inputPasswordLogin.parentElement.classList.add("error");
  }

  if (inputPasswordLogin.value) {
    errPassword.innerText = "";
    inputPasswordLogin.parentElement.classList.remove("error");
    if (inputEmailLogin.value === "") {
      errEmail.innerText = "Vui lòng nhập thông tin";
      inputEmailLogin.parentElement.classList.add("error");
    }
  }
});
inputPasswordLogin.addEventListener("blur", function () {
  if (!inputEmailLogin.value && !inputPasswordLogin.value) {
    errEmail.innerText = "Vui lòng nhập thông tin";
    errPassword.innerText = "Vui lòng nhập thông tin";
    inputEmailLogin.parentElement.classList.add("error");
    inputPasswordLogin.parentElement.classList.add("error");
  }

  if (inputPasswordLogin.value) {
    errPassword.innerText = "";
    inputPasswordLogin.parentElement.classList.remove("error");
  }
});

submitLogin.addEventListener("click", function () {
  if (!inputEmailLogin.value && !inputPasswordLogin.value) {
    errEmail.innerText = "Vui lòng nhập thông tin";
    errPassword.innerText = "Vui lòng nhập thông tin";
    inputEmailLogin.parentElement.classList.add("error");
    inputPasswordLogin.parentElement.classList.add("error");
  }
});
