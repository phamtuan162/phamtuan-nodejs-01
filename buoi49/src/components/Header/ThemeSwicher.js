"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <>
      {currentTheme === "dark" ? (
        <i
          onClick={() => setTheme("light")}
          className=" primary icon far btn-toggle fa-sun"
        ></i>
      ) : (
        <i
          onClick={() => setTheme("dark")}
          className="icon far btn-toggle fa-moon"
        ></i>
      )}
      <i className=" fas fa-user icon" id="login-btn"></i>
      <i className=" icon fas fa-search" id="search-btn"></i>
    </>
  );
}
