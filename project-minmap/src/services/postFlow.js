import { client } from "@/utils/clientUtils";
export const postFlow = async (body) => {
  const { data, response } = await client.post(`/post`, body);
};
