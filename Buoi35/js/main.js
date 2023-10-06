import { getPosts } from "./crud.js";
import { renderPosts } from "./renderUi.js";
let start = 0;
let limit = 4;
let isLoading = false;
const loadingEl = document.querySelector(".loading");

const loadMorePosts = async () => {
  if (isLoading) return;
  isLoading = true;

  try {
    const data = await getPosts({}, isLoading);
    start += limit;
    if (start >= data.length) {
      start = 0;
    }
    const newPosts = await getPosts(
      { _limit: limit, _start: start },
      isLoading
    );

    renderPosts(newPosts);
  } catch (e) {
    console.error("Lỗi khi tải dữ liệu:", e);
  } finally {
    loadingEl.style.display = "none";
    isLoading = false;
  }
};

const handleScroll = () => {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  if (scrollY + windowHeight >= documentHeight - 100) {
    loadingEl.style.display = "block";
    loadMorePosts();
  }
};

getPosts({ _limit: limit, _start: start }, isLoading);

window.addEventListener("scroll", handleScroll);
