import { client } from "./client.js";
import { config } from "./config.js";
import { renderLogin } from "./renderLogin.js";
import { renderHeader } from "./renderHeader.js";
import { renderBlogs } from "./renderBlogs.js";
import { renderPostBlog } from "./renderPostBlog.js";
const { SERVER_AUTH_API } = config;
client.setUrl(SERVER_AUTH_API);
const blogEl = document.querySelector(".blogs .container");

export const getBlogs = async () => {
  const { data: tokens, response } = await client.get(`/blogs`);
  const { message } = tokens;
  if (response.ok) {
    renderBlogs(tokens.data);
    console.log(message);
  } else {
    console.log(message);
  }
};

export const handleLogin = async (data) => {
  const { data: tokens, response } = await client.post("/auth/login", data);
  const { message } = tokens;

  if (response.ok) {
    const { accessToken, refreshToken } = tokens.data;
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    alert(`${message}`);
    renderHeader();
    getProfile();
    getBlogs();
  } else {
    alert(`${message}`);
  }
};
export const handleRegister = async (data) => {
  const { data: tokens, response } = await client.post("/auth/register", data);
  const { message } = tokens;
  if (response.ok) {
    renderLogin();
    alert(`${message}`);
  } else {
    alert(`${message}`);
  }
};
export const handleLogout = async (e) => {
  const token = localStorage.getItem("access_token");
  const { data: tokens, response } = await client.post(
    "/auth/logout",
    null,
    token
  );
  const { message } = tokens;
  if (response.ok) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    e.target.remove();
    renderHeader();
    renderPostBlog();
    getBlogs();
    alert(`${message}`);
  } else {
    alert(`${message}`);
  }
};
export const postBlog = async (content, title) => {
  const token = localStorage.getItem("access_token");
  const { data: tokens, response } = await client.post(
    "/blogs",
    { title, content },
    token
  );
  const { message } = tokens;
  if (response.ok) {
    getProfile(token);
    getBlogs();
    alert(`${message}`);
  } else {
    alert(`${message}`);
  }
};

export const getProfile = async () => {
  const token = localStorage.getItem("access_token");
  const { data: tokens, response } = await client.get("/users/profile", token);
  const { message } = tokens;
  if (response.ok) {
    renderPostBlog(tokens.data);
  } else {
    alert(`${message}`);
  }
};
