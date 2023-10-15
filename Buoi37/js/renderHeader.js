import { handleLogout } from "./function.js";
import { renderLogin } from "./renderLogin.js";
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
    const btnLogin = document.createElement("button");
    btnLogin.innerText = "Đăng nhập";
    btnLogin.classList.add("btn");
    headerInner.append(btnLogin);
    btnLogin.addEventListener("click", (e) => {
      e.preventDefault();
      btnLogin.remove();
      renderLogin();
    });
  }
};
