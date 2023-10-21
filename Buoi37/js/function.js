import { client } from "./client.js";
import { config } from "./config.js";
import { renderLogin } from "./renderLogin.js";
import { renderHeader } from "./renderHeader.js";
import { renderBlogs } from "./renderBlogs.js";
import { renderPostBlog } from "./renderPostBlog.js";
import { toast } from "./toastMessage.js";
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
  const { message, status_code: type } = data;
  console.log(data);
  if (response.ok) {
    const { accessToken, refreshToken } = data.data;
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    await renderHeader();
    await getProfile();
    await getBlogs({
      limit: limit,
      page: page,
    });
    toast({ message, type });
  } else {
    toast({ message, type });
  }
};
export const handleRegister = async (value) => {
  const { email } = value;
  const { data, response } = await client.post("/auth/register", value);
  const { message, status_code: type } = data;
  if (response.ok) {
    renderLogin(email);
    toast({ message, type });
  }
  // else {
  //   toast({ message, type });
  // }
};
export const handleLogout = async (e) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    const { data, response } = await client.post("/auth/logout", null, token);
    const { message, status_code: type } = data;
    if (response.ok) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      e.target.remove();
      await renderHeader();
      await renderPostBlog();
      await getBlogs({
        limit: limit,
        page: page,
      });
      toast({ message, type });
    } else {
      await refreshToken();
      await handleLogout(e);
    }
  }
};
export const postBlog = async (title, content) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    const { data, response } = await client.post(
      "/blogs",
      { title, content },
      token
    );
    const { message, status_code: type } = data;
    if (response.ok) {
      await getProfile();
      await getBlogs({
        limit: limit,
        page: page,
      });
      toast({ message, type });
    } else {
      await refreshToken();
      await postBlog(content, title);
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
    } else {
      await refreshToken();
      await getProfile();
    }
  }
};

export const refreshToken = async () => {
  const refresh_token = localStorage.getItem("refresh_token");
  if (refresh_token) {
    const { data, response } = await client.post("/auth/refresh-token", {
      refreshToken: refresh_token,
    });
    const { status_code: type } = data;
    if (response.ok) {
      localStorage.setItem("access_token", data.data.token.accessToken);
      localStorage.setItem("refresh_token", data.data.token.refreshToken);
    } else {
      localStorage.clear();
      const message =
        "Phiên đăng nhập của bạn đã hết hạn vui lòng đăng nhập lại để tiếp tục!";
      toast({ message, type });
      await renderHeader();
      await renderPostBlog();
      await getBlogs({
        _limit: limit,
        _page: page,
      });
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
  } else if (password.length < 8) {
    return "Mật khẩu phải có ít nhất 8 ký tự";
  } else if (!/[A-Z]/.test(password)) {
    return "Mật khẩu phải chứa ít nhất một chữ cái hoa";
  } else if (!/[a-z]/.test(password)) {
    return "Mật khẩu phải chứa ít nhất một chữ cái thường";
  } else if (!/[0-9]/.test(password)) {
    return "Mật khẩu phải chứa ít nhất một chữ số";
  } else {
    return "";
  }
}
export function handleLink(content) {
  const patternEmail = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  const patternTel = /((0|\+84)\d{9})/g;
  const patternLink = /^(?:http|https):\/\/[a-z-_0-9\.]+\.([a-z]{2,})\/.*$/;
  const patternYoutube =
    /https:\/\/(?:www\.)?youtube\.com\/(watch\?v=|embed\/|v\/)?[a-zA-Z0-9_-]+(&[^\s]+)?|https:\/\/youtu\.be\/[a-zA-Z0-9_-]+(&[^\s]+)?/g;
  content = content
    .replace(/\s+/g, " ")
    .replace(/\n{2,}/g, "\n")
    .replace(patternEmail, (match) => {
      return `<a href="mailto:${match}" target="_blank">${match}</a>`;
    })
    .replace(patternTel, (match) => {
      return `<a href="tel:${match}" target="_blank">${match}</a>`;
    })
    .replace(patternLink, (match) => {
      if (patternYoutube.test(match)) {
        match = match.replace(patternYoutube, (match) => {
          let videoId = match.split("v=")[1]
            ? match.split("v=")[1].split("&")[0]
            : match.split("/").pop();
          return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
        });
      } else {
        match = `<a href="${match}" target="_blank">${match}</a>`;
      }
      return match;
    });
  return content;
}
