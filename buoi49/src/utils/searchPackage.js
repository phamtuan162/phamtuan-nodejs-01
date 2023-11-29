import { pageApi } from "@/config/config";
export const getPackage = async (query = {}) => {
  const queryString = new URLSearchParams(query).toString();
  const apiUrl = queryString ? `${pageApi}?${queryString}` : pageApi;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
};
