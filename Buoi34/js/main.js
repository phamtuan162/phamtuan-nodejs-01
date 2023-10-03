import {
  getAllTodo,
  getTodo,
  postTodo,
  updateTodo,
  deleteTodo,
} from "./crud.js";

const todos = document.querySelector(".todos");
const btnAdd = todos.querySelector(".btn__add");
const btnCancel = todos.querySelector(".btn__cancel");
const btnSearch = todos.querySelector(".btn__search");
const modal = todos.querySelector(".modal");
const btnCompleted = todos.querySelector(".btn__completed");
const todoLists = todos.querySelector(".list-todo");
const todoListCompleted = todos.querySelector(".list-todo__completed");
const modalForm = modal.querySelector(".form__add");
const input = modalForm.querySelector(".form__input");
var isNew = false;
var isActive = false;
var idEdit = null;

const renderListTodo = async () => {
  const data = await getAllTodo();
  const todosUnCompleted = data.filter((todo) => {
    return todo.completed === false;
  });
  todoLists.innerHTML = todosUnCompleted
    .map((todo) => {
      return `  <div class="item" data-id ="${todo.id}">
              <span>${todo.course}</span>
              <div class="group-action">
                <button type="button" class="btn-action btn__delete">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path
                      d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"
                    ></path>
                  </svg>
                </button>
                <button type="button" class="btn-action btn__edit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    style="margin-right: -1px"
                  >
                    <path
                      d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
                    ></path>
                  </svg>
                </button>
                <button type="button" class="btn-action btn__conform">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path
                      d="M96 80c0-26.5 21.5-48 48-48H432c26.5 0 48 21.5 48 48V384H96V80zm313 47c-9.4-9.4-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L409 161c9.4-9.4 9.4-24.6 0-33.9zM0 336c0-26.5 21.5-48 48-48H64V416H512V288h16c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V336z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>`;
    })
    .join("");
  const todosCompleted = data.filter((todo) => {
    return todo.completed === true;
  });

  todoListCompleted.innerHTML = todosCompleted
    .map((todo) => {
      return `  <div class="item" data-id ="${todo.id}">
              <span>${todo.course}</span>
              <div class="group-action">
                <button type="button" class="btn-action btn__delete">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path
                      d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"
                    ></path>
                  </svg>
                </button>
                <button type="button" class="btn-action btn__edit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    style="margin-right: -1px"
                  >
                    <path
                      d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
                    ></path>
                  </svg>
                </button>
                <button type="button" class="btn-action btn__conform is-completed">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path
                      d="M96 80c0-26.5 21.5-48 48-48H432c26.5 0 48 21.5 48 48V384H96V80zm313 47c-9.4-9.4-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L409 161c9.4-9.4 9.4-24.6 0-33.9zM0 336c0-26.5 21.5-48 48-48H64V416H512V288h16c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V336z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>`;
    })
    .join("");
  const span = btnCompleted.querySelector("span");
  span.textContent = span.textContent.replace(/\d+/g, todosCompleted.length);

  const btnConforms = todos.querySelectorAll(".btn__conform");
  btnConforms.forEach((btnConform) => {
    btnConform.addEventListener("click", async () => {
      const todoId = btnConform.parentElement.parentElement.dataset.id;
      confirmTodoHandle(todoId);
    });
  });

  const btnDeletes = todos.querySelectorAll(".btn__delete");
  btnDeletes.forEach((btnDelete) => {
    btnDelete.addEventListener("click", async () => {
      const todoId = btnDelete.parentElement.parentElement.dataset.id;
      deleteTodoHandle(todoId);
    });
  });

  const btnEdits = todos.querySelectorAll(".btn__edit");
  btnEdits.forEach((btnEdit) => {
    btnEdit.addEventListener("click", async () => {
      const todoId = btnEdit.parentElement.parentElement.dataset.id;
      const todoData = await getTodo(todoId);
      input.value = todoData.course;
      idEdit = todoId;
      modal.classList.add("is-show");
      isNew = true;
    });
  });
};
renderListTodo();
const deleteTodoHandle = async (todoId) => {
  deleteTodo(todoId);
  renderListTodo();
};
const confirmTodoHandle = async (todoId) => {
  const { id, course, completed } = await getTodo(todoId);
  if (window.confirm("Bạn có chắc chắn muốn thay đổi không?")) {
    if (completed === true) {
      updateTodo(id, course, false);
    } else {
      updateTodo(id, course, true);
    }
    renderListTodo();
  }
};

btnAdd.addEventListener("click", () => {
  modal.classList.add("is-show");
});

btnCancel.addEventListener("click", () => {
  modal.classList.remove("is-show");
});

btnCompleted.addEventListener("click", () => {
  if (!isActive) {
    todoListCompleted.style.display = "block";
    btnCompleted.classList.add("active");
    isActive = true;
  } else {
    todoListCompleted.style.display = "none";
    isActive = false;
    btnCompleted.classList.remove("active");
  }
});

modalForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const value = input.value.trim();

  if (window.confirm("Bạn có chắc chắn muốn lưu không?")) {
    const data = await getAllTodo();
    if (value === "") {
      alert("Vui lòng nhập một giá trị.");
      return;
    }
    const check = data.find(({ course }) => course === value);
    if (check) {
      alert("Course đã có sẵn, nhập lại!");
    } else {
      if (!isNew) {
        postTodo({ course: value, completed: false });
        isNew = true;
      } else {
        const { completed } = await getTodo(idEdit);
        updateTodo(idEdit, value, completed);
        isNew = false;
      }
      modal.classList.remove("is-show");
      input.value = "";
      renderListTodo();
    }
  }
});
