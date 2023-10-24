import { handleLogout } from "./function.js";
import { renderLogin } from "./renderLogin.js";
import { route } from "./router.js";
const headerInner = document.querySelector(".header__inner");
export const renderHeader = async () => {
  headerInner.innerText = "";
  const h1 = document.createElement("h1");
  h1.innerText = "Blogger";
  headerInner.append(h1);
  if (localStorage.getItem("access_token")) {
    const btnLogout = document.createElement("button");
    btnLogout.classList.add("btn");
    btnLogout.innerText = "Đăng xuất";
    btnLogout.style.backgroundColor = "red";
    headerInner.append(btnLogout);
    btnLogout.addEventListener("click", (e) => {
      e.preventDefault();
      handleLogout(e);
    });
  } else {
    const btnLogin = document.createElement("a");
    btnLogin.href = "./login";
    btnLogin.style.textDecoration = "none";
    btnLogin.innerText = "Đăng nhập";
    btnLogin.classList.add("btn");
    headerInner.append(btnLogin);
    btnLogin.addEventListener("click", (e) => {
      e.preventDefault();
      // route(e);
      btnLogin.remove();
      renderLogin();
    });
  }
};
