import React, { useState } from "react";
import { getApiKey } from "../config/todoApi";
import { toast } from "react-toastify";
let isSearch = false;
export function TodoForm({ handleAddTodo, setSearch, search }) {
  const [value, setValue] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleAddTodo(value);
    isSearch = false;
    setValue("");
  };

  const handleChangeInput = async (e) => {
    console.log(isSearch);
    const newValue = e.target.value;
    setValue(newValue);
    if (isSearch) {
      setSearch(newValue);
    }
  };
  return (
    <form className="form-add" onSubmit={handleSubmit}>
      <div className="form-inner">
        <input
          type="text"
          name="todo"
          placeholder={isSearch ? "Tìm kiếm..." : "Thêm một việc làm mới"}
          className="form-input"
          onChange={handleChangeInput}
          value={value}
          autoFocus
        />
        <button type="submit" className="btn-add">
          Thêm mới
        </button>
        <button
          type="button"
          className="btn-search"
          onClick={() => {
            toast.success("Đã chuyển qua chế độ tìm kiếm");
            isSearch = true;
            setSearch(value);
          }}
        >
          Tìm kiếm
        </button>
      </div>
    </form>
  );
}
