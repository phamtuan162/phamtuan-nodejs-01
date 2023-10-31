import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export function Todo({ todo, handleUpdateTodo, handleDeleteTodo }) {
  const { todo: value, isCompleted, _id: todoId } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const editTodo = async () => {
    setIsEditing(true);
  };
  const exitTodo = async () => {
    setIsEditing(false);
  };
  const handleCheckboxChange = () => {
    setCompleted(!completed);
  };
  const handleEditSave = () => {
    if (inputValue) {
      setIsEditing(false);
      handleUpdateTodo(todoId, {
        todo: inputValue,
        isCompleted: completed,
      });
    } else {
      toast.warning("Nếu ô nhập trống sẽ tự chuyển thành chế độ xóa", {
        onClose: () => {
          handleDeleteTodo(todoId);
        },
      });
    }
  };
  return (
    <li className="todo-item">
      {isEditing ? (
        <>
          <input
            style={completed ? { textDecorationLine: "line-through" } : {}}
            className="todo-item__input"
            value={inputValue}
            onChange={handleInputChange}
          />
          <div className="action" style={{ justifyContent: "space-between" }}>
            <div className="completed">
              <label htmlFor={todoId}>
                {completed ? "Completed" : "Not Completed"}
              </label>
              <input
                id={todoId}
                type="checkbox"
                onChange={handleCheckboxChange}
              ></input>
            </div>
            <div className="group-btn">
              <button
                type="button"
                className="btn btn-cancel"
                onClick={exitTodo}
              >
                Thoát
              </button>
              <button
                type="button"
                className="btn btn-edit"
                onClick={() => handleEditSave()}
              >
                Update
              </button>
              <button
                type="button"
                className="btn btn-delete"
                onClick={() => handleDeleteTodo(todoId)}
              >
                Xóa
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <input
            className="todo-item__input"
            value={value}
            disabled
            style={isCompleted ? { textDecorationLine: "line-through" } : {}}
          />
          <div className="action">
            <button type="button" className="btn btn-edit" onClick={editTodo}>
              Sửa
            </button>
            <button
              type="button"
              className="btn btn-delete"
              onClick={() => handleDeleteTodo(todoId)}
            >
              Xóa
            </button>
          </div>
        </>
      )}
    </li>
  );
}
