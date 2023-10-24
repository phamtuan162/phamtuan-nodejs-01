import { About } from "./Pages/About";
import { Product } from "./Pages/Product";
import { startRouter } from "./Utils/router";
import { Home } from "./Pages/Home";
import { ProductDetail } from "./Pages/ProductDetail";
import { DefaultLayout } from "./Layouts/DefaultLayout";
export function App() {
  return startRouter(
    [
      {
        path: "/",
        component: Home,
      },
      {
        path: "/gioi-thieu",
        component: About,
      },
      {
        path: "/san-pham",
        component: Product,
      },
      {
        path: "/san-pham/:id",
        component: ProductDetail,
      },
    ],
    DefaultLayout
  );
}
