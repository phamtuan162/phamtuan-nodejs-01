import { client } from "./client";
import { toast } from "react-toastify";
import { handleLogin } from "../Components/HandleLogin";

const handleApiError = () => {
  toast.error("Lỗi cần reload lại trang", {
    onClose: () => {
      localStorage.clear();
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
    localStorage.setItem("apiKey", data.data.apiKey);
    return true;
  } else {
    return false;
  }
};

export const getTodo = async () => {
  const apiKey = checkApiKey();
  if (!apiKey) return;

  const { data, response } = await client.get("/todos", apiKey);
  if (response.ok) {
    return data;
  }
};

export const postTodo = async (body) => {
  const apiKey = checkApiKey();
  if (!apiKey) return;

  const { data, response } = await client.post("/todos", body, apiKey);
  if (response.ok) {
    toast.success(data.message);
    return data;
  } else {
    handleApiError();
  }
};

export const updateTodo = async (id, body) => {
  const apiKey = checkApiKey();
  if (!apiKey) return;

  const { data, response } = await client.patch(`/todos/${id}`, body, apiKey);
  if (response.ok) {
    toast.success(data.message);
    return data;
  } else {
    handleApiError();
  }
};

export const deleteTodo = async (id) => {
  const apiKey = checkApiKey();
  if (!apiKey) return;

  const { response, data } = await client.delete(`/todos/${id}`, apiKey);
  if (response.ok) {
    toast.success(data.message);
    return data;
  } else {
    handleApiError();
  }
};

export const searchTodo = async (value) => {
  const apiKey = checkApiKey();
  if (!apiKey) return;

  const { response, data } = await client.get(`/todos?q=${value}`, apiKey);
  if (response.ok) {
    return data;
  } else {
    handleApiError();
  }
};
