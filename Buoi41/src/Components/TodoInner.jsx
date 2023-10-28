import React, { useState, useEffect } from "react";
import { TodoForm } from "./TodoForm";
import { Todo } from "./Todo";
import { updateTodo, deleteTodo, postTodo, getTodo } from "../config/todoApi";
import Loading from "./Loading";

export const TodoInner = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    getTodo().then((data) => {
      const listTodo = data.listTodo;
      setLoading(false);
      setTodos(listTodo);
    });
  };

  const handleAddTodo = async (value) => {
    await postTodo({ todo: value });
    fetchData();
  };

  const handleDeleteTodo = async (todoId) => {
    await deleteTodo(todoId);
    fetchData();
  };

  const handleUpdateTodo = async (todoId, body) => {
    await updateTodo(todoId, body);
    fetchData();
  };

  return (
    <div className="todo-inner">
      <h1 className="heading">Welcome to Todo App!</h1>
      <TodoForm handleAddTodo={handleAddTodo} />

      <ul className="todo-list">
        {loading ? (
          <Loading />
        ) : todos.length > 0 ? (
          todos.map((todo) => (
            <Todo
              todo={todo}
              key={todo._id}
              handleDeleteTodo={handleDeleteTodo}
              handleUpdateTodo={handleUpdateTodo}
            />
          ))
        ) : (
          <li className="todo-item">Không có todo</li>
        )}
      </ul>
    </div>
  );
};
