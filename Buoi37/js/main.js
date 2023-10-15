import { renderHeader } from "./renderHeader.js";
import { getBlogs, getProfile } from "./function.js";
import { renderPostBlog } from "./renderPostBlog.js";

renderHeader();
if (localStorage.getItem("access_token")) {
  getProfile();
  getBlogs();
} else {
  getBlogs();
}
