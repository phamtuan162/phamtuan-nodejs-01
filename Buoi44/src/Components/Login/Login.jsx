import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "../../core/useSelector";
import { toast } from "react-toastify";

export default function Login() {
  const { isAuthenticated, loginWithPopup } = useAuth0();
  const { dispatch } = useSelector();

  const handleLogin = async () => {
    dispatch({ type: "loading", payload: true });
    await loginWithPopup();
    dispatch({ type: "loading", payload: false });
    toast.success("Đăng nhập thành công");
  };
  return (
    <div className="login">
      <h1 className="heading">Cảm ơn bạn đã sử dụng dịch vụ của F8</h1>
      <p className="desc">
        Nếu có bất kỳ câu hỏi hay trợ giúp nào, hãy đăng nhập và đặt câu hỏi tại
        đây!
      </p>
      <button className="btn" tabIndex={0} type="button" onClick={handleLogin}>
        Đăng nhập || Đăng ký
      </button>
    </div>
  );
}
