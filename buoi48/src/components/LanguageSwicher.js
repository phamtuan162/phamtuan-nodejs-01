"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";

export default function LanguageSwitcher() {
  const router = useRouter();
  const { locale } = useParams();

  const [language, setLanguage] = useState(
    localStorage.getItem("lang") || locale
  );

  const changeLanguage = () => {
    const newLanguage = language === "vn" ? "en" : "vn";

    setLanguage(newLanguage);

    router.push(newLanguage);
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
          {language === "vn" ? "vi" : "en"}
        </Button>
      </div>
    </div>
  );
}
