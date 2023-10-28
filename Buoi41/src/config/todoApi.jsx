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

export const getApiKey = async (email) => {
  if (email) {
    const { data, response } = await client.get(`/api-key?email=${email}`);
    if (response.ok) {
      const apiKey = data.data.apiKey;
      localStorage.setItem("apiKey", apiKey);
      return true;
    } else {
      return false;
    }
  }
};
export const getTodo = async () => {
  const apiKey = localStorage.getItem("apiKey");
  if (apiKey) {
    const { data, response } = await client.get(`/todos`, apiKey);
    if (response.ok) {
      return data.data;
    } else {
      localStorage.removeItem("apiKey");
      const email = localStorage.getItem("email");
      getApiKey(email).then((check) => {
        if (check) {
          getTodo();
        } else {
          handleApiError();
        }
      });
    }
  }
};

export const postTodo = async (body) => {
  const apiKey = localStorage.getItem("apiKey");
  if (apiKey) {
    const { data, response } = await client.post(`/todos`, body, apiKey);
    const { message } = data;
    if (response.ok) {
      toast.success(message);
      return data.data;
    } else {
      toast.error(message);
      localStorage.removeItem("apiKey");
      const email = localStorage.getItem("email");
      getApiKey(email).then((check) => {
        if (check) {
          postTodo(body);
        } else {
          handleApiError();
        }
      });
    }
  }
};

export const updateTodo = async (id, body) => {
  const apiKey = localStorage.getItem("apiKey");
  if (apiKey) {
    const { data, response } = await client.patch(`/todos/${id}`, body, apiKey);
    const { message } = data;
    if (response.ok) {
      toast.success(message);
      return data.data;
    } else {
      toast.error(message);
      localStorage.removeItem("apiKey");
      const email = localStorage.getItem("email");
      getApiKey(email).then((check) => {
        if (check) {
          updateTodo(id, body);
        } else {
          handleApiError();
        }
      });
    }
  }
};

export const deleteTodo = async (id) => {
  const apiKey = localStorage.getItem("apiKey");
  if (apiKey) {
    const { response, data } = await client.delete(`/todos/${id}`, apiKey);
    const { message } = data;
    if (response.ok) {
      toast.success(message);
      return data.data;
    } else {
      toast.error(message);
      localStorage.removeItem("apiKey");
      const email = localStorage.getItem("email");
      getApiKey(email).then((check) => {
        if (check) {
          deleteTodo(id);
        } else {
          handleApiError();
        }
      });
    }
  }
};
