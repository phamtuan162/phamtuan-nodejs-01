export const checkApiKey = () => {
  const apiKey = localStorage.getItem("apiKey");
  if (!apiKey) {
    return false;
  }
  return apiKey;
};
