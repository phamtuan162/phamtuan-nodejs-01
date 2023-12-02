"use client";
import {
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
  Textarea,
  Button,
} from "@nextui-org/react";
import "./contact.scss";
import emailjs from "@emailjs/browser";
// import { configEmailjs } from "@/app/config/config";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
// const { SERVICE_ID, TEMPLATE_ID, API_KEY } = configEmailjs;

const Contact = () => {
  const form = useRef();
  const t = useTranslations("contact");

  const subjects = [
    {
      value: t("subject1"),
    },
    {
      value: t("subject2"),
    },
    {
      value: t("subject3"),
    },
    {
      value: t("subject4"),
    },
  ];
  const HandleSubmit = async (e) => {
    e.preventDefault();
    await emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID,
        process.env.NEXT_PUBLIC_TEMPLATE_ID,
        form.current,
        process.env.NEXT_PUBLIC_API_KEY
      )
      .then(
        (result) => {
          toast.success("Bạn đã gửi thành công");
        },
        (error) => {
          toast.error("Bạn gửi thất bại. Vui lòng thử lại!");
        }
      );
    form.current.reset();
  };
  return (
    <Card className="contact max-w-full w-[400px] h-[480px]">
      <CardBody className="container">
        <h1 className="title">{t("Contact")}</h1>
        <form
          ref={form}
          className="form flex flex-col justify-center items-center gap-4 w-full"
          onSubmit={HandleSubmit}
        >
          <Input
            isRequired
            label={t("label_name")}
            placeholder={t("placeholder_name")}
            type="name"
            name="user_name"
            variant={"underlined"}
          />
          <Input
            isRequired
            label={t("label_email")}
            placeholder={t("placeholder_email")}
            type="email"
            name="user_email"
            variant={"underlined"}
          />
          <Select
            isRequired
            items={subjects}
            label={t("label_subject")}
            placeholder={t("placeholder_subject")}
            variant={"underlined"}
            name="subject"
          >
            {(subject) => (
              <SelectItem key={subject.value}>{subject.value}</SelectItem>
            )}
          </Select>
          <Textarea
            variant={"underlined"}
            label={t("label_message")}
            placeholder={t("placeholder_message")}
            labelPlacement="outside"
            className="col-span-12 md:col-span-6 mb-6 md:mb-0"
            name="message"
          />
          <Button
            type="submit"
            color="success"
            variant="ghost"
            className="w-full"
          >
            {t("send")}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};
export default Contact;
