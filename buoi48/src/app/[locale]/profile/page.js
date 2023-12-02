"use client";
import { Button } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
const Profile = () => {
  const t = useTranslations("profile");
  const router = useRouter();
  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };
  return (
    <Button type="button" color="danger" onClick={handleLogout}>
      {t("logout")}
    </Button>
  );
};
export default Profile;
