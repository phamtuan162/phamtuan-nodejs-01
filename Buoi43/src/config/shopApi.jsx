import { client } from "./client";
import { toast } from "react-toastify";
import { config } from "./config";
const { LIMIT } = config;
export const handleApiError = () => {
  toast.error("Lỗi cần reload lại trang", {
    onClose: () => {
      localStorage.removeItem("apiKey");
      localStorage.removeItem("email");
      window.location.reload();
    },
  });
};

const checkApiKey = () => {
  const apiKey = localStorage.getItem("apiKey");
  if (!apiKey) {
    return false;
  }
  return apiKey;
};

export const getApiKey = async (email) => {
  if (!email) return false;

  const { data, response } = await client.get(`/api-key?email=${email}`);
  if (response.ok) {
    console.log(data);
    localStorage.setItem("apiKey", data.data.apiKey);
    return true;
  } else {
    return false;
  }
};

export const getProducts = async (query = { limit: LIMIT }) => {
  const queryString = new URLSearchParams(query).toString();
  const { data, response } = await client.get(`/products?${queryString}`);
  if (response.ok) {
    return data.data;
  }
};

export const getProfile = async () => {
  const apiKey = checkApiKey();
  if (!apiKey) return;

  const { data, response } = await client.get(`/users/profile`, apiKey);
  if (response.ok) {
    return data.data;
  } else {
    handleApiError();
  }
};

export const postOrder = async (body) => {
  const apiKey = checkApiKey();
  if (!apiKey) return;
  const { data, response } = await client.post(`/orders`, body, apiKey);
  console.log(data);
  if (response.ok) {
    return data.data;
  } else {
    handleApiError();
  }
};
