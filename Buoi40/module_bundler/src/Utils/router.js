import Navigo from "navigo";
import { Error } from "../404";

const app = document.querySelector("#app");
const routerPage = new Navigo("/", { linksSelector: "a" });

const renderRouter = (app, html) => {
  app.innerHTML = html;
};

window.navigate = (path) => routerPage.navigate(path);

const renderHtml = (defaultLayout, componentPath, params) => {
  const layout = defaultLayout() || "";
  return layout.replace(/\{.*\}/g, componentPath(params));
};

const configureRoute = (path, component, defaultLayout) => {
  routerPage.on(path, (params) => {
    const html = renderHtml(defaultLayout, component, params);
    renderRouter(app, html);
  });
};

const setNotFoundPage = () => {
  routerPage.notFound(() => {
    const html = Error();
    renderRouter(app, html);
  });
};

const startRouter = (routes, defaultLayout) => {
  routes.forEach((route) => {
    configureRoute(route.path, route.component, defaultLayout);
  });
  setNotFoundPage();
  routerPage.resolve();
};

export { routerPage, startRouter };
