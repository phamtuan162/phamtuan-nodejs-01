import { toast } from "react-toastify";
import { getApiKey } from "../config/todoApi";

export const handleLogin = async (setEmail) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,}$/;
  let enteredEmail = localStorage.getItem("email");

  if (!enteredEmail) {
    enteredEmail = prompt("Please enter your email:", "example@example.com");
  }

  if (emailPattern.test(enteredEmail)) {
    const checkEmail = await getApiKey(enteredEmail);
    if (checkEmail) {
      const username = enteredEmail.split("@")[0];
      setEmail(enteredEmail);
      localStorage.setItem("email", enteredEmail);
      toast.success(`Chào mừng bạn đã quay trở lại ${username}`);
    } else {
      await toast.error("Email không tồn tại", {
        onClose: () => {
          handleLogin(setEmail);
        },
      });
      localStorage.removeItem("email");
    }
  } else {
    await toast.error("Email không đúng định dạng", {
      onClose: () => {
        handleLogin(setEmail);
      },
    });
    localStorage.removeItem("email");
  }
};
