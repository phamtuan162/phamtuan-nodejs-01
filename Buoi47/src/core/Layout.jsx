import { Routes } from "react-router-dom";
import { publicRoute } from "../routers/publicRoute";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Layout() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/login");
  }, []);
  return <Routes>{publicRoute}</Routes>;
}

export default Layout;
