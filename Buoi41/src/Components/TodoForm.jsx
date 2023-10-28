import React, { useState } from "react";
import { getApiKey } from "../config/todoApi";
export function TodoForm({ handleAddTodo }) {
  const [value, setValue] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleAddTodo(value);
    setValue("");
  };
  return (
    <form className="form-add" onSubmit={handleSubmit}>
      <div className="form-inner">
        <input
          type="text"
          name="todo"
          placeholder="Thêm một việc làm mới"
          className="form-input"
          onChange={(e) => {
            setValue(e.target.value);
          }}
          value={value}
        />
        <button type="submit" className="btn-add">
          Thêm mới
        </button>
      </div>
    </form>
  );
}
