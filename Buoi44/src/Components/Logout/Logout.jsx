import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "../../core/useSelector";
import { toast } from "react-toastify";

export default function Logout() {
  const { logout } = useAuth0();
  const { dispatch } = useSelector();
  const handleLogout = async () => {
    dispatch({ type: "loading", payload: true });
    setTimeout(async () => {
      await logout();
      dispatch({ type: "loading", payload: false });
      toast.success("Đăng xuất thành công");
    }, 2500);
  };
  return (
    <button type="button" className="btn-logout" onClick={handleLogout}>
      Đăng xuất
    </button>
  );
}
