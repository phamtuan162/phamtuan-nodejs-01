import { toast } from "react-toastify";
import { getApiKey } from "../config/todoApi";

export const handleLogin = async (setLoading, setEmail) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,}$/;
  let enteredEmail = localStorage.getItem("email");

  if (!enteredEmail) {
    enteredEmail = prompt(
      "Xin vui lòng nhập email của bạn:",
      "example@example.com"
    );
    if (emailPattern.test(enteredEmail)) {
      getApiKey(enteredEmail).then((checkEmail) => {
        if (checkEmail) {
          const username = enteredEmail.split("@")[0];
          localStorage.setItem("email", enteredEmail);
          setLoading(false);
          setEmail(enteredEmail);
          toast.success(`Chào mừng bạn đã quay trở lại ${username}`);
        } else {
          toast.error("Email không tồn tại", {
            onClose: () => {
              handleLogin(setLoading, setEmail);
            },
          });
        }
      });
    } else if (enteredEmail === "") {
      toast.error("Nhập email", {
        onClose: () => {
          handleLogin(setLoading, setEmail);
        },
      });
    } else {
      toast.error("Email không đúng định dạng", {
        onClose: () => {
          handleLogin(setLoading, setEmail);
        },
      });
    }
  }
};
