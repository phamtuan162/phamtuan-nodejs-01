import Home from "../pages/Home/Home";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import Login from "../pages/Auth/Login";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import { Route } from "react-router-dom";
import GustMiddleWares from "../middlewares/GustMiddleWares";
export const publicRoute = (
  <>
    <Route path="/" element={<DefaultLayout />}>
      <Route index element={<Home />} />
    </Route>
    <Route path="/" element={<AuthLayout />}>
      <Route element={<GustMiddleWares />}>
        <Route path="/login" element={<Login />} />
      </Route>
    </Route>
  </>
);
