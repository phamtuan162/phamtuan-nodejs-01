import { renderRegister } from "./renderRegister.js";
import { getBlogs, handleLogin } from "./function.js";
import { renderHeader } from "./renderHeader.js";
const blogEl = document.querySelector(".blogs .container");

export const renderLogin = async () => {
  blogEl.innerText = "";
  const loginHtml = `  <section class="form-inner">
              <div class="info-group">
                <h1>Đăng nhập</h1>
                <span>Please enter your email and password.</span
                ><span 
                  ><a class="link"   href ="#!">Go to home</a></span
                >
              </div>
              <form class="form-login">
                <div class="form-control">
                  <label class="form-label">Enter Your email</label
                  ><input
                    name="email"
                    type="email"
                    class="form-input"
                    placeholder="Please enter the email"
                    value=""
                  />
                </div>
                <div class="form-control">
                  <label class="form-label">Enter Your password</label
                  ><input
                    name="password"
                    type="password"
                    class="form-input"
                    placeholder="Please enter the password"
                    value=""
                  />
                </div>
                <div class="button-group">
                  <button class="btn btn-login" title="Đăng nhập" type="submit">
                    Đăng nhập</button
                  ><button
                    class="btn btn-register"
                    title=Đăng ký"
                    type="button"
                  >
                    Đăng ký
                  </button>
                </div>
              </form>
            </section>`;
  blogEl.innerHTML = loginHtml;
  const aEl = document.querySelector(".form-inner .link ");
  aEl.addEventListener("click", (e) => {
    blogEl.innerText = "";
    renderHeader();
    getBlogs();
  });
  const btnRegister = document.querySelector(".btn-register");
  btnRegister.addEventListener("click", (e) => {
    e.preventDefault();
    renderRegister();
  });

  const loginForm = document.querySelector(".form-login");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailEl = e.target.querySelector('.form-input[name="email"]');
      const passwordEl = e.target.querySelector('.form-input[name="password"]');

      const email = emailEl.value;
      const password = passwordEl.value;

      if (email === "" || password === "") {
        confirm("Nhập đầy đủ thông tin?");
      } else {
        handleLogin({ email, password });
        emailEl.value = "";
        passwordEl.value = "";
      }
    });
  }
};
