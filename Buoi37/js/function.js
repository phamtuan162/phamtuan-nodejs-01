import { client } from "./client.js";
import { config } from "./config.js";
import { renderLogin } from "./renderLogin.js";
import { renderHeader } from "./renderHeader.js";
import { renderBlogs } from "./renderBlogs.js";
import { renderPostBlog } from "./renderPostBlog.js";
const { SERVER_AUTH_API, LIMIT_PAGE } = config;
export const limit = LIMIT_PAGE;
export const page = 1;
client.setUrl(SERVER_AUTH_API);
const blogEl = document.querySelector(".blogs .container");

export const getBlogs = async (query = {}) => {
  const queryString = new URLSearchParams(query).toString();
  const { data, response } = await client.get(`/blogs?${queryString}`);
  const { message } = data;
  if (response.ok) {
    renderBlogs(data.data);
  }
};

export const handleLogin = async (value) => {
  const { data, response } = await client.post("/auth/login", value);
  const { message } = data;
  if (response.ok) {
    const { accessToken, refreshToken } = data.data;
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    alert(`${message}`);
    renderHeader();
    getProfile();
    getBlogs({
      limit: limit,
      page: page,
    });
  } else {
    alert(`${message}`);
  }
};
export const handleRegister = async (value) => {
  const { data, response } = await client.post("/auth/register", value);
  const { message } = data;
  if (response.ok) {
    renderLogin();
    alert(`${message}`);
  } else {
    alert(`${message}`);
  }
};
export const handleLogout = async (e) => {
  const token = localStorage.getItem("access_token");
  const { data, response } = await client.post("/auth/logout", null, token);
  const { message } = data;
  if (response.ok) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    e.target.remove();
    renderHeader();
    renderPostBlog();
    getBlogs({
      limit: limit,
      page: page,
    });
    alert(`${message}`);
  } else {
    refreshToken();
    handleLogout(e);
  }
};
export const postBlog = async (content, title) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    const { data, response } = await client.post(
      "/blogs",
      { title, content },
      token
    );
    const { message } = data;
    if (response.ok) {
      getProfile();
      getBlogs({
        limit: limit,
        page: page,
      });
      alert(`${message}`);
    } else if (response.status === 401) {
      refreshToken();
      postBlog(content, title);
    } else {
      alert(`${message}`);
    }
  }
};

export const getProfile = async () => {
  const token = localStorage.getItem("access_token");
  if (token) {
    const { data, response } = await client.get("/users/profile", token);
    const { message } = data;
    if (response.ok) {
      renderPostBlog(data.data);
    } else if (response.status === 401) {
      refreshToken();
      getProfile();
    } else {
      alert(`${message}`);
    }
  }
};

export const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  if (refreshToken) {
    const { data, response } = await client.post("/auth/refresh-token", {
      refreshToken: refreshToken,
    });
    if (response.ok) {
      if (data.code === 200) {
        localStorage.setItem("access_token", data.data.token.accessToken);
        localStorage.setItem("refresh_token", data.data.token.refreshToken);
      }
    } else {
      localStorage.clear();
    }
  }
};

export const getTime = (seconds) => {
  const day = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds - day * 3600 * 24) / 3600);
  const minutes = Math.floor((seconds - day * 3600 * 24 - hours * 3600) / 60);

  if (day > 0) {
    return day + " ngày trước";
  } else if (hours > 0) {
    return hours + " giờ trước";
  } else if (minutes > 0) {
    return minutes + " phút trước";
  } else {
    return "vừa xong";
  }
};
export function handlePicker(id) {
  jQuery(document).ready(($) =>
    $(id).datetimepicker({ format: "Y-m-d H:i", defaultDate: new Date() })
  );
}

export function formatDate(time) {
  const date = new Date(time);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${day}/${month + 1}/${year}  ${hours}giờ${
    minutes > 0 ? ":" + minutes + "phút" : ""
  }`;
}

export function validateForm(email, password) {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  if (!emailRegex.test(email)) {
    return "Email không hợp lệ";
  }
  if (password.length < 8) {
    return "Mật khẩu phải có ít nhất 8 ký tự";
  } else if (!/[A-Z]/.test(password)) {
    return "Mật khẩu phải chứa ít nhất một chữ cái hoa";
  } else if (!/[a-z]/.test(password)) {
    return "Mật khẩu phải chứa ít nhất một chữ cái thường";
  } else if (!/[0-9]/.test(password)) {
    return "Mật khẩu phải chứa ít nhất một chữ số";
  }
}
