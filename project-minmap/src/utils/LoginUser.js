import { RegisterUser } from "./RegisterUser";
export const LoginUser = async (credentials) => {
  const response = await fetch(
    `${process.env.SERVER_API_LOGIN_REGISTER}/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    }
  );
  const data = await response.json();
  if (data.code === 400) {
    if (data.message === "Tài khoản không tồn tại") {
      return await RegisterUser(credentials);
    } else {
      return null;
    }
  } else {
    return data.data;
  }
};
