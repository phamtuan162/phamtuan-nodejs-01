import { toast } from "react-toastify";
import { getApiKey, getProfile, handleApiError } from "../../config/shopApi";
export const Login = async (setLoading, setEmail) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let enteredEmail = localStorage.getItem("email");
  if (!enteredEmail) {
    enteredEmail = prompt(
      "Xin vui lòng nhập email của bạn:",
      "example@example.com"
    );
  }
  if (emailPattern.test(enteredEmail)) {
    const checkEmail = await getApiKey(enteredEmail);
    console.log(checkEmail);
    if (checkEmail) {
      localStorage.setItem("email", enteredEmail);
      getProfile().then((data) => {
        if (data) {
          const username = data.emailId.name;
          setLoading(false);
          setEmail(enteredEmail);
          toast.success(`Chào mừng bạn đã quay trở lại ${username}`);
        } else {
          handleApiError();
        }
      });
    } else {
      toast.error("Email không tồn tại", {
        onClose: () => {
          Login(setLoading, setEmail);
        },
      });
    }
  } else if (enteredEmail === "") {
    toast.error("Nhập email", {
      onClose: () => {
        Login(setLoading, setEmail);
      },
    });
  } else {
    toast.error("Email không đúng định dạng", {
      onClose: () => {
        Login(setLoading, setEmail);
      },
    });
  }
};
