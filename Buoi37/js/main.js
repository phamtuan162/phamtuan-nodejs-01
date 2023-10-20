import { renderHeader } from "./renderHeader.js";
import { getBlogs, getProfile, page, limit, refreshToken } from "./function.js";

refreshToken().then(() => {
  renderHeader();
  if (localStorage.getItem("access_token")) {
    getProfile();
    getBlogs({
      _limit: limit,
      _page: page,
    });
  } else {
    getBlogs({
      limit: limit,
      page: page,
    });
  }
});
