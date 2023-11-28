import { pageApi } from "@/config/config";
export const getData = async (query = {}) => {
  const queryString = new URLSearchParams(query).toString();
  const apiUrl = queryString ? `${pageApi}?${queryString}` : pageApi;
  const response = await fetch(apiUrl);
  const data = await response.json();
  const limitedData = data.slice(0, 6);

  return limitedData;
};
