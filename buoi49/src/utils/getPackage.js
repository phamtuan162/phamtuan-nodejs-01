import { pageApi } from "@/config/config";
export const getPackage = async (id) => {
  const apiUrl = `${pageApi}/${id}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
};
