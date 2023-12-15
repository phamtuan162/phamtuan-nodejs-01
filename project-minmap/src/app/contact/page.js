"use client";
import { Card, CardBody, Input, Textarea, Button } from "@nextui-org/react";
import "./contact.scss";
import emailjs from "@emailjs/browser";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
const Contact = () => {
  const form = useRef();
  const { data: session } = useSession();
  const HandleSubmit = async (e) => {
    e.preventDefault();
    await emailjs
      .sendForm(
        process.env.SERVICE_ID,
        process.env.TEMPLATE_ID,
        form.current,
        process.env.API_KEY
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
    <Card className="contact max-w-full w-[400px] ">
      <CardBody className="container">
        <h1 className="title">CONTACT US</h1>
        <form
          ref={form}
          className="form flex flex-col justify-center items-center gap-4 w-full"
          onSubmit={HandleSubmit}
        >
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input
              type="name"
              name="first_name"
              variant="bordered"
              label="First Name"
            />
            <Input
              type="name"
              name="last_name"
              variant="bordered"
              label="Last Name"
            />
          </div>

          <Input
            isRequired
            type="email"
            name="user_email"
            variant="bordered"
            label="Email"
            defaultValue={session?.user.email}
          />

          <Input
            isRequired
            type="phone"
            name="phone"
            variant="bordered"
            label="Phone"
          />

          <Textarea
            label="Write your message..."
            variant="bordered"
            className="col-span-12 md:col-span-6 mb-6 md:mb-0"
            name="message"
          />
          <Button
            type="submit"
            color="secondary"
            variant="ghost"
            className="w-full"
          >
            Send Message
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};
export default Contact;
