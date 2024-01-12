import { client } from "@/utils/clientUtils";
export const getFlow = async (flow_id) => {
  const { response, data } = await client.get(`/mindmap?id=${flow_id}`);
  if (response.ok) {
    return data;
  }
};
export const getFlowUser = async (userId) => {
  const { response, data } = await client.get(`/mindmap?user_id=${userId}`);
  if (response.ok) {
    return data;
  }
};

export const postFlow = async (body) => {
  const { response, data } = await client.post(`/mindmap`, body);
  if (response.ok) {
    return data;
  }
};

export const deleteFlow = async (id) => {
  const { response, data } = await client.delete(`/mindmap/${id}`);
  if (response.ok) {
    return data;
  }
};
export const updateFlow = async (body) => {
  const { response, data } = await client.put(`/mindmap/${body.id}`, body);
  if (response.ok) {
    return data;
  }
};
