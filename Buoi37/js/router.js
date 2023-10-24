import { renderLogin } from "./renderLogin.js";
export const route = (event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  handleLocation();
};
const routes = {
  "/": "./index.html",
  "./login": "./login.html",
  "/register": "./register.html",
};

const handleLocation = async () => {
  const path = window.location.pathname;
  console.log(path);
  const route = routes[path];
  const html = await fetch(route).then((data) => data.text());
  document.querySelector(".blogs .container").innerHTML = html;
  //   renderLogin();
};

window.onpopstate = handleLocation;
window.route = route;
