import { renderHeader } from "./renderHeader.js";
import { getBlogs, getProfile, page, limit, refreshToken } from "./function.js";

async function runApp() {
  try {
    await refreshToken();
    await renderHeader();
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      await getProfile();
      await getBlogs({
        _limit: limit,
        _page: page,
      });
    } else {
      getBlogs({
        limit: limit,
        page: page,
      });
    }
  } catch (error) {
    console.error(error);
  }
}

runApp();
