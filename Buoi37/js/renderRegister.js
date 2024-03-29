import { handleRegister, getBlogs, validateForm } from "./function.js";
import { renderLogin } from "./renderLogin.js";
import { renderHeader } from "./renderHeader.js";
import { toast } from "./toastMessage.js";
const blogEl = document.querySelector(".blogs .container");

export const renderRegister = async () => {
  blogEl.innerText = "";
  const registerHtml = `    <section class="form-inner">
                <div class="info-group">
                <h1>Đăng ký</h1>
                <span>Please enter your name, email and password.</span>
                <span ><a class ="link" href ="#!">Go to home</a></span>
              </div>
              <form class="form-register">
                <div class="form-control">
                  <label class="form-label">Enter Your name</label
                  ><input
                    name="name"
                    type="name"
                    class="form-input"
                    placeholder="Please enter the name"
                    value=""
                  />
                </div>
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
                  <button class="btn btn-register" title="Đăng ký" type="submit">
                    Đăng ký</button
                  ><button
                    class="btn btn-login"
                    title="Đăng nhập"
                    type="button"
                  >
                    Đăng nhập
                  </button>
                </div>
              </form>
            </section>`;
  blogEl.innerHTML = registerHtml;
  const aEl = document.querySelector(".form-inner .link ");
  aEl.addEventListener("click", async (e) => {
    await renderHeader();
    await getBlogs();
  });
  const btnLogin = document.querySelector(".btn-login");
  btnLogin.addEventListener("click", (e) => {
    e.preventDefault();
    renderLogin();
  });

  const registerForm = document.querySelector(".form-register");
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      let message = "";
      let type = "failed";
      e.preventDefault();
      const nameEl = e.target.querySelector('.form-input[name="name"]');
      const emailEl = e.target.querySelector('.form-input[name="email"]');
      const passwordEl = e.target.querySelector('.form-input[name="password"]');

      const email = emailEl.value;
      const password = passwordEl.value;
      const name = nameEl.value;

      if (email === "" || password === "" || name === "") {
        message = "Nhập đầy đủ thông tin";
        toast({ message, type });
      } else {
        message = validateForm(email, password);
        if (message === "Thành công") {
          await handleRegister({ email, password, name });
          emailEl.value = "";
          passwordEl.value = "";
          nameEl.value = "";
        } else {
          toast({ message, type });
        }
      }
    });
  }
};
