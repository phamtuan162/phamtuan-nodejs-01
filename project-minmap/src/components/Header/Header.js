"use client";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { useSession, signIn, signOut } from "next-auth/react";
import ThemeSwitcher from "./ThemeSwicher";
import { toast } from "react-toastify";
const Header = () => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  useEffect(() => {
    if (pathName.startsWith("/my-mindmap") && !session) {
      signIn();
    }
    if (session?.user.id) {
      const userId = session.user.id;
      localStorage.setItem("user_id", JSON.stringify(userId));
    }
  }, [session]);

  const handleLogout = async () => {
    toast.warning("Bạn có muốn đăng xuất không,Click Here", {
      onClick: async () => {
        await signOut();
        localStorage.removeItem("flowArr");
        localStorage.removeItem("user_id");
        window.location.href = "/";
        toast.success("Bạn đăng xuất thành công");
      },
    });
  };

  const menuItems = [
    { name: "Trang chủ", href: "/" },
    { name: "Giới thiệu", href: "./introduce" },
    { name: "Tính năng", href: "./feature" },
    { name: "Bảng giá", href: "./price_board" },
    { name: "Liên hệ", href: "./contact" },
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent style={{ flexGrow: "0" }}>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="lg:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-blue-600 ">Mindmap Flow</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden lg:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/" className=" hover:bg-zinc-300 p-2">
            Trang chủ
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="./introduce"
            color="foreground"
            className=" hover:bg-zinc-300 p-2"
          >
            Giới thiệu
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="./feature"
            color="foreground"
            className=" hover:bg-zinc-300 p-2"
          >
            Tính năng
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="./price_board"
            color="foreground"
            className="hover:bg-zinc-300 p-2"
          >
            Bảng giá
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color="foreground"
            className=" hover:bg-zinc-300 p-2"
            href="./contact"
          >
            Liên hệ
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end" style={{ flexGrow: "0" }}>
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        {session ? (
          <>
            <NavbarItem>
              <p className=" text-blue-600 hover:bg-blue-200 p-2 ">
                Hi, {session.user.name}
              </p>
            </NavbarItem>
            <NavbarItem>
              <Link
                href="/my-mindmap"
                className="text-blue-600 hover:bg-blue-200 p-2"
              >
                Mindmap
              </Link>
            </NavbarItem>
            <NavbarItem>
              <button
                onClick={handleLogout}
                className="p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-solid border-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition-colors duration-300 mt-1 md:mt-0 md:ml-1"
              >
                Đăng xuất
              </button>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem>
            <button
              onClick={signIn}
              className="p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-solid border-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition-colors duration-300 mt-1 md:mt-0 md:ml-1"
            >
              Đăng ký / Đăng nhập
            </button>
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map(({ name, href }, index) => (
          <NavbarMenuItem key={index}>
            <Link
              color="foreground"
              className=" hover:underline hover:text-blue-400"
              href={href}
              size="lg"
            >
              {name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};
export default Header;
