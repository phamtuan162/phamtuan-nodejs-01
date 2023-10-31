import React, { useState, useEffect } from "react";
import { TodoForm } from "./TodoForm";
import { Todo } from "./Todo";
import {
  searchTodo,
  updateTodo,
  deleteTodo,
  postTodo,
  getTodo,
} from "../config/todoApi";
import Loading from "./Loading";
import { toast } from "react-toastify";
import { useDebounce } from "./hooks";

export const TodoInner = ({ setLoading }) => {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      searchTodo(debouncedSearch).then((data) => {
        setLoading(false);
        if (data) {
          const listTodo = data.data.listTodo;
          setTodos(listTodo);
        }
      });
    };
    fetchData();
  }, [debouncedSearch]);

  const fetchData = async () => {
    setLoading(true);
    getTodo().then((data) => {
      setLoading(false);
      if (data) {
        const listTodo = data.data.listTodo;
        setTodos(listTodo);
      }
    });
  };

  const handleAddTodo = async (value) => {
    if (value === "") {
      toast.error("Không được để ô trống");
    } else {
      postTodo({ todo: value }).then((data) => {
        if (data) {
          fetchData();
        }
      });
    }
  };

  const handleDeleteTodo = async (todoId) => {
    toast.warning("Bạn có chắc chán muốn xóa? Hãy click vào đây", {
      onClick: () => {
        deleteTodo(todoId).then((data) => {
          if (data) {
            fetchData();
          }
        });
      },
    });
  };

  const handleUpdateTodo = async (todoId, body) => {
    updateTodo(todoId, body).then((data) => {
      if (data) {
        fetchData();
      }
    });
  };

  const todoItems = todos.map((todo) => (
    <Todo
      todo={todo}
      key={todo._id}
      handleDeleteTodo={handleDeleteTodo}
      handleUpdateTodo={handleUpdateTodo}
    />
  ));

  return (
    <div className="todo-inner">
      <h1 className="heading">Welcome to Todo App!</h1>
      <TodoForm
        handleAddTodo={handleAddTodo}
        setSearch={setSearch}
        search={search}
      />
      <ul className="todo-list">
        {todoItems.length > 0 ? (
          todoItems
        ) : (
          <li className="todo-item">Không có todo</li>
        )}
      </ul>
    </div>
  );
};
