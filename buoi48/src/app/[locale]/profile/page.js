import { Button } from "@nextui-org/react";
import { useTranslations } from "next-intl";

const Profile = () => {
  const t = useTranslations("profile");

  return <Button color="danger">{t("logout")}</Button>;
};
export default Profile;
