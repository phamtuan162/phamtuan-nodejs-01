import { client } from "@/utils/clientUtils";
export const getFlowUser = async (userId) => {
  const response = client.get(`?user_id=${userId}`);
  if (response.ok) {
    const data = await response.json();
    return data.data;
  }
};
