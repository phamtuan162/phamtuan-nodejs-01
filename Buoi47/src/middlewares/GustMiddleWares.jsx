import { Outlet, Navigate } from "react-router-dom";
function GustMiddleWares() {
  const apiKey = localStorage.getItem("apiKey");

  return !apiKey ? <Outlet /> : <Navigate to="/" />;
}

export default GustMiddleWares;
