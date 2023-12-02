const authLoginApi = `${process.env.NEXT_PUBLIC_SERVER_API}/auth/login`;
export const postLogin = async (form) => {
  const response = await fetch(authLoginApi, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(form),
    cache: "no-cache",
  });
  const { message, data } = await response.json();
  return { message, data };
};
