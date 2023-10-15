import { renderHeader } from "./renderHeader.js";
import { getBlogs, getProfile } from "./function.js";
import { renderPostBlog } from "./renderPostBlog.js";

renderHeader();
if (localStorage.getItem("access_token")) {
  const access_token = localStorage.getItem("access_token");
  getProfile(access_token);
}
getBlogs();
