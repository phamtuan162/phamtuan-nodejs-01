import { client } from "../utils/clientUtils";
import { checkApiKey } from "./checkApiKey";
import { HandleApiError } from "./HandleApiError";
export const getData = async () => {
  const apiKey = checkApiKey();
  if (!apiKey) return;

  const { data, response } = await client.get(`/tasks`, apiKey);
  if (response.ok) {
    return data.data;
  } else {
    HandleApiError();
  }
};
