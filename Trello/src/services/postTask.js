import { client } from "../utils/clientUtils";
import { checkApiKey } from "./checkApiKey";
import { HandleApiError } from "./HandleApiError";
export const postTask = async (body) => {
  const apiKey = await checkApiKey();
  if (!apiKey) return;
  console.log(apiKey);
  const { data, response } = await client.post(`/tasks`, body, apiKey);
  if (response.ok) {
    return data.data;
  } else {
    HandleApiError();
  }
};
