const authRegisterApi = `${process.env.NEXT_PUBLIC_SERVER_API}/auth/register`;
import { toast } from "react-toastify";

export const postRegister = async (form) => {
  const response = await fetch(authRegisterApi, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(form),
    cache: "no-cache",
  });
  const { message, data } = await response.json();
  if (response.ok) {
    toast.success(message);
    return true;
  } else {
    toast.error(message);
    return false;
  }
};
