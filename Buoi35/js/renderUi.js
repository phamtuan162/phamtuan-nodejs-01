export const posts = document.querySelector(".posts");
export const postList = posts.querySelector(".posts-list");

export const renderPosts = (posts) => {
  if (posts.length) {
    posts.forEach(
      ({ id, author, avatar, title, imgPosts, category, status, content }) => {
        const postItem = document.createElement("section");
        postItem.classList.add("posts-item");
        postList.append(postItem);

        const authorEl = document.createElement("div");
        authorEl.classList.add("posts-item__author");
        postItem.append(authorEl);

        const authorAvatar = document.createElement("img");
        authorAvatar.classList.add("avatar");
        authorAvatar.src = avatar;
        authorAvatar.alt = author;
        authorEl.append(authorAvatar);

        const authorName = document.createElement("span");
        authorName.classList.add("name");
        authorName.innerText = author;
        authorEl.append(authorName);

        const statusEl = document.createElement("div");
        statusEl.classList.add("posts-item__status");
        postItem.append(statusEl);

        if (status.length) {
          status.forEach((statusItem) => {
            const aEl = document.createElement("a");
            aEl.innerText = statusItem;
            aEl.href = "#!";
            statusEl.append(aEl);
          });
        }

        const titleEl = document.createElement("h2");
        titleEl.classList.add("posts-item__title");
        titleEl.innerText = title;
        postItem.append(titleEl);

        const imgWrapperEl = document.createElement("figcaption");
        imgWrapperEl.classList.add("posts-item__img--wrapper");
        postItem.append(imgWrapperEl);

        const imgEl = document.createElement("img");
        imgEl.classList.add("posts-item__img");
        imgEl.src = imgPosts[0];
        imgEl.alt = title;
        imgWrapperEl.append(imgEl);

        const contentEl = document.createElement("div");
        contentEl.classList.add("posts-item__content");
        postItem.append(contentEl);

        const descEl = document.createElement("p");
        descEl.classList.add("posts-item__desc");
        descEl.innerHTML = `${content}`;
        contentEl.append(descEl);

        const imgWrapperEl2 = document.createElement("figcaption");
        imgWrapperEl2.classList.add("posts-item__img--wrapper");
        postItem.append(imgWrapperEl2);

        const imgEl2 = document.createElement("img");
        imgEl2.classList.add("posts-item__img");
        imgEl2.src = imgPosts[imgPosts.length - 1];
        imgEl2.alt = title;
        imgWrapperEl2.append(imgEl2);

        const categoryEl = document.createElement("div");
        categoryEl.classList.add("posts-item__category");
        categoryEl.innerText = "Category:";
        postItem.append(categoryEl);

        const spanCategory = document.createElement("span");
        spanCategory.innerText = category;
        categoryEl.append(spanCategory);
      }
    );
  }
};
