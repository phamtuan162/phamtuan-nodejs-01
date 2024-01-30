"use client";
import { Input, Button, Card, CardBody } from "@nextui-org/react";
import "./loginregister.scss";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon ";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
const LoginRegister = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    if (session) {
      router.push("./");
    }
  }, [session]);
  const t = useTranslations("auth");
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const HandleLoginRegister = async (e) => {
    e.preventDefault();
    signIn("credentials", form);
    await postLogin({
      email: form.email,
      password: form.password,
    }).then(async ({ data, message }) => {
      if (data) {
        toast.success(message);
        router.push("./profile");
      } else {
        toast.error(message);
        if (message === "Tài khoản không tồn tại") {
          toast.info("Chuyển sang đăng ký");
          postRegister(form).then((check) => {
            if (check) {
              setForm({
                name: "",
                email: "",
                password: "",
              });
            }
          });
        }
      }
    });
  };
  const HandleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleLogin = async () => {
    const response = await fetch(
      "http://localhost:3000/api/v1/auth/google/callback"
    );
    const data = await response.json();
    console.log(data);
  };

  const { name, email, password } = form;
  return (
    <Card className="login-register max-w-full w-[400px] h-[450px]">
      <CardBody className="container text-green-400">
        <h1 className="title ">{t("loginRegister")}</h1>
        <form
          className="form flex flex-col justify-center items-center gap-4 w-full"
          onSubmit={HandleLoginRegister}
        >
          <Input
            label={t("label_username")}
            placeholder={t("placeholder_username")}
            type="name"
            name="name"
            variant={"bordered"}
            autoComplete={"off"}
            onChange={HandleChange}
            value={name}
          />
          <Input
            label={t("label_email")}
            placeholder={t("placeholder_email")}
            type="email"
            name="email"
            variant={"bordered"}
            autoComplete={"off"}
            onChange={HandleChange}
            value={email}
          />
          <Input
            name="password"
            label={t("label_password")}
            placeholder={t("placeholder_password")}
            variant="bordered"
            autoComplete={"off"}
            onChange={HandleChange}
            value={password}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
          />

          <Button
            type="submit"
            color="primary"
            variant="ghost"
            className="w-full"
          >
            {t("loginRegister")}
          </Button>
          <Button
            type="button"
            color="success"
            variant="ghost"
            className="w-full"
            onClick={handleLogin}
          >
            Đăng nhập github
          </Button>
          <Button
            type="button"
            color="success"
            variant="ghost"
            className="w-full"
            onClick={signIn}
          >
            {t("socialLogin")}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default LoginRegister;
