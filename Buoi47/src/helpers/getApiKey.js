import { client } from "../utils/clientUtils";
export const getApiKey = async (email) => {
  if (!email) return false;

  const { data, response } = await client.get(`/api-key?email=${email}`);
  if (response.ok) {
    localStorage.setItem("apiKey", data.data.apiKey);
    return true;
  } else {
    return false;
  }
};
