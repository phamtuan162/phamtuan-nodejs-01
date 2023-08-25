const todoList = document.querySelector(".todo-list");
const btnAdd = document.querySelector(".todo-btn");
const todoInput = document.querySelector(".todo-input");

todoInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    btnAdd.click();
  }
});

btnAdd.addEventListener("click", function (e) {
  e.preventDefault();
  var todoText = todoInput.value.trim();
  if (todoText !== "") {
    todoInput.value = "";
    manageTodoItem("add", todoText);
  }
});

// Hàm Add,Xóa,Sửa
function manageTodoItem(action, valueText) {
  if (action === "add") {
    const html = `<div class="todo-item">
            <p class="">${valueText}</p>
            <div class="todo-action">
              <button class="btn btn-edit">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="pen-to-square"
                  class="svg-inline--fa fa-pen-to-square"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
                  ></path>
                </svg>
              </button>
              <button class="btn btn-destroy">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="trash"
                  class="svg-inline--fa fa-trash"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>`;
    todoList.innerHTML += html;

    const btnDestroys = document.querySelectorAll(".todo-list .btn-destroy");
    btnDestroys.forEach((btnDestroy) => {
      btnDestroy.addEventListener("click", function () {
        manageTodoItem("destroy", this);
      });
    });

    const btnEdits = document.querySelectorAll(".todo-list .btn-edit");
    btnEdits.forEach((btnEdit) => {
      btnEdit.addEventListener("click", function () {
        manageTodoItem("edit", this);
      });
    });
  } else if (action === "destroy") {
    const todoItem = valueText.closest(".todo-item");
    if (todoItem) {
      todoItem.remove();
    }
  } else if (action === "edit") {
    const todoItem = valueText.closest(".todo-item");
    if (todoItem) {
      const todoItemText = todoItem.querySelector("p").textContent;
      const todoForm = document.createElement("form");
      todoForm.classList.add("todo-form");
      todoForm.innerHTML = `
    <div class="todo-group">
      <input
        type="text"
        name=""
        id=""
        class="todo-input"
        value="${todoItemText}"
      />
      <button type="submit" class="todo-btn">Add Task</button>
    </div>`;
      todoItem.parentNode.replaceChild(todoForm, todoItem);

      todoForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const newValueText = todoForm.querySelector(".todo-input").value;
        todoItem.innerHTML = `
       <p>${newValueText}</p>
       <div class="todo-action">
              <button class="btn btn-edit">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="pen-to-square"
                  class="svg-inline--fa fa-pen-to-square"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
                  ></path>
                </svg>
              </button>
              <button class="btn btn-destroy">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="trash"
                  class="svg-inline--fa fa-trash"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
                  ></path>
                </svg>
              </button>
            </div>`;

        todoForm.parentNode.replaceChild(todoItem, todoForm);

        todoItem
          .querySelector(".btn-edit")
          .addEventListener("click", function () {
            manageTodoItem("edit", this);
          });

        todoItem
          .querySelector(".btn-destroy")
          .addEventListener("click", function () {
            manageTodoItem("destroy", this);
          });
      });
    }
  }
}
