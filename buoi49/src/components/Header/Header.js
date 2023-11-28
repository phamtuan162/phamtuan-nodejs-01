"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from "@nextui-org/react";
import ThemeSwitcher from "./ThemeSwicher";
import "./header.scss";
import React from "react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Trang chủ",
    "Đặt lịch",
    "Ưu đãi",
    "Dịch vụ",
    "Thư viện",
    "Đánh giá",
    "Liên hệ",
  ];
  return (
    <Navbar className="navbar" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="brand">
          <p className="font-bold text-inherit ">TRAVEL</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link href="/" className="link">
            Trang chủ
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#book" className="link">
            Đặt lịch
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#packages" className="link">
            Ưu đãi
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#services" className="link">
            Dịch vụ
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/gallery" className="link">
            Thư viện
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#review" className="link">
            Đánh giá
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#contact" className="link">
            Liên hệ
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className=" lg:flex">
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu style={{ backgroundColor: "rgba(51, 51, 51, 0.9)" }}>
        {menuItems.map((item, index) => (
          <NavbarMenuItem
            key={`${item}-${index}`}
            style={{ backgroundColor: "  rgba(34, 34, 34, 0.75)" }}
          >
            <Link
              style={{ color: "#fff" }}
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

export default Header;
