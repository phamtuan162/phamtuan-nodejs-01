import { getTime, handleLink } from "./function.js";
const blogEl = document.querySelector(".blogs .container");

export const renderBlogs = async (blogs) => {
  blogEl.innerText = "";
  const h2 = document.createElement("h2");
  h2.innerText = "Danh sách bài viết";
  blogEl.append(h2);
  const blogList = document.createElement("div");
  blogList.classList.add("blog-list");
  blogEl.append(blogList);
  blogs.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  console.log(blogs);
  if (blogs.length) {
    blogs.forEach(({ title, content, userId: user, createdAt }) => {
      const dateBlog = new Date(createdAt);
      const dateNow = new Date();
      const timePost = getTime((dateNow.getTime() - dateBlog.getTime()) / 1000);

      const { name, userID } = user;

      const blogItem = document.createElement("section");
      blogItem.classList.add("blog-item");
      blogList.append(blogItem);

      const dateEl = document.createElement("span");
      dateEl.classList.add("date");
      dateEl.innerHTML = `${timePost}`;
      blogItem.append(dateEl);

      const hoursEl = document.createElement("span");
      hoursEl.classList.add("hours");
      hoursEl.innerText = `${dateBlog.getHours()} giờ`;
      dateEl.append(hoursEl);

      const minsEl = document.createElement("span");
      minsEl.classList.add("mins");
      minsEl.innerText = `${dateBlog.getMinutes()} phút `;
      dateEl.append(minsEl);

      const authorEl = document.createElement("div");
      authorEl.classList.add("author");
      blogItem.append(authorEl);

      const avatarEl = document.createElement("span");
      avatarEl.classList.add("avatar");
      avatarEl.setAttribute("data-name", `${name.charAt(0).toUpperCase()}`);
      authorEl.append(avatarEl);

      const nameEl = document.createElement("span");
      nameEl.classList.add("name");
      nameEl.innerText = `${name}`;
      authorEl.append(nameEl);

      const linkEl = document.createElement("a");
      linkEl.classList.add("link");
      linkEl.innerText = `${name.toLowerCase()}`;
      blogItem.append(linkEl);

      const hashtagEl = document.createElement("span");
      hashtagEl.classList.add("hashtag-name");
      hashtagEl.innerText = `@${name}`;
      blogItem.append(hashtagEl);

      const titleEl = document.createElement("h3");
      titleEl.classList.add("title");
      titleEl.innerText = `${title}`;
      blogItem.append(titleEl);

      const descEl = document.createElement("p");
      descEl.classList.add("desc");
      const contentNew = handleLink(content).replace(/&/g, "&amp;");
      descEl.innerHTML = contentNew;
      blogItem.append(descEl);
    });
  }
};
