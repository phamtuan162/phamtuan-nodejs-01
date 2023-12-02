"use client";
import { useParams, useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@nextui-org/button";
export default function LanguageSwitcher() {
  const router = useRouter();
  const { locale } = useParams();
  const pathName = usePathname();
  const [language, setLanguage] = useState(
    localStorage.getItem("lang") || locale
  );
  const changeLanguage = () => {
    const newLanguage = language === "vn" ? "en" : "vn";
    setLanguage(newLanguage);
    const newPathname = pathName.replace(`/${language}`, `/${newLanguage}`);
    router.push(newPathname);

    localStorage.setItem("lang", newLanguage);
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="flex justify-center">
        <Button
          className="bg-default rounded-md p-1"
          color="default"
          onClick={changeLanguage}
        >
          {language === "vn" ? "en" : "vi"}
        </Button>
      </div>
    </div>
  );
}
