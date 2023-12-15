export const RegisterUser = async (credentials) => {
  const response = await fetch(`${process.env.SERVER_API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  return data.code === 201 ? credentials : null;
};
