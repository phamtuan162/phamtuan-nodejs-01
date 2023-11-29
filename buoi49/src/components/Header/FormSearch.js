"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";
const FormSearch = ({ formSearchRef }) => {
  const router = useRouter();
  const inputRef = useRef(null);
  const HandleSearch = (e) => {
    e.preventDefault();

    router.push(`/search/${inputRef.current.value}`);
  };
  const HandleChange = (e) => {
    inputRef.current.value = e.target.value;
  };
  return (
    <form
      ref={formSearchRef}
      action=""
      className="search-bar-container "
      onSubmit={HandleSearch}
    >
      <input
        ref={inputRef}
        type="search"
        id="search-bar"
        placeholder="Tìm kiếm..."
        onChange={HandleChange}
      />
      <label htmlFor="search-bar" className="fas fa-search"></label>
    </form>
  );
};

export default FormSearch;
