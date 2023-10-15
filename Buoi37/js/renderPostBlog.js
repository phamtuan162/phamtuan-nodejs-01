import { postBlog } from "./function.js";
const userActionEl = document.querySelector(".user-action .container");

export const renderPostBlog = async (data) => {
  userActionEl.innerText = "";

  if (data) {
    const { name } = data;
    const authorEl = document.createElement("div");
    authorEl.classList.add("author");
    userActionEl.append(authorEl);

    const avatarEl = document.createElement("span");
    avatarEl.classList.add("avatar");
    avatarEl.setAttribute("data-name", `${name.charAt(0).toUpperCase()}`);
    authorEl.append(avatarEl);

    const nameEl = document.createElement("span");
    nameEl.classList.add("name");
    nameEl.innerText = `${name}`;
    authorEl.append(nameEl);

    const formPostEl = document.createElement("form");
    formPostEl.innerHTML = ` <div class="form-control">
                  <label class="form-label">Enter Your title</label
                  ><input
                    name="title"
                    type="text"
                    class="form-input"
                    placeholder="Please enter the title"
                    value=""
                  />
                </div>
                <div class="textarea-group">
                  <label class="form-label">Enter Your content</label
                  ><textarea
                    name="content"
                    class="form-textarea"
                    placeholder="content here..."
                  ></textarea>
                </div>
                <button class="btn btn-post" type="submit">Write new!</button>`;

    formPostEl.addEventListener("submit", (e) => {
      e.preventDefault();
      const titleEl = document.querySelector(".form-input");
      const contentEl = document.querySelector(".form-textarea");
      const title = titleEl.value;
      const content = contentEl.value;
      if (title === "" || content === "") {
        alert("Nhập đầy đủ thông tin");
      } else {
        postBlog(title, content);
        titleEl.value = "";
        contentEl.value = "";
      }
    });
    userActionEl.append(formPostEl);
  }
};
