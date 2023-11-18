import { toast } from "react-toastify";

export const HandleApiError = () => {
  toast.error("Lỗi cần reload lại trang", {
    onClose: () => {
      localStorage.clear();
      window.location.reload();
    },
  });
};
