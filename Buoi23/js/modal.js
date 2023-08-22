const btnModal = document.querySelector(".btn-login");
const modal = document.querySelector(".modal");
const modalOverlay = document.querySelector(".modal-overlay");
const btnLogin = document.querySelector(".modal__login");
const btnRegister = document.querySelector(".modal__register");
const contentLogin = document.querySelector(".login-content");
const contentRegister = document.querySelector(".register-content");

// Show modal
btnModal.addEventListener("click", function () {
  modal.classList.add("show");
  btnLogin.classList.add("active");
  btnRegister.classList.remove("active");
  contentRegister.classList.add("hidden");
  contentLogin.classList.remove("hidden");

  resetFormFields(inputEmailLogin, errEmail);
  resetFormFields(inputPasswordLogin, errPassword);
});

modalOverlay.addEventListener("click", function () {
  modal.classList.remove("show");
});

document.onkeyup = function (e) {
  if (e.key === "Escape") {
    modal.classList.remove("show");
  }
};

// Check Email
function isValidEmail(email) {
  var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Check Name
// function isValidUsername(username) {
//   var re = /^[a-zA-Z0-9]{3,}$/;
//   return re.test(username);
// }

// Check Password
function isValidPassword(password) {
  var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return re.test(password);
}

// Reset form
function resetFormFields(inputElement, errElement) {
  inputElement.form.reset();
  if (inputElement.value === "") {
    errElement.innerText = "";
    inputElement.parentElement.classList.remove("error");
  }
}

// View password
function viewPassword(inputElement, eyeElement) {
  if (inputElement.getAttribute("type") === "password") {
    inputElement.setAttribute("type", "text");
    eyeElement.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    inputElement.setAttribute("type", "password");
    eyeElement.classList.replace("fa-eye-slash", "fa-eye");
  }
}
