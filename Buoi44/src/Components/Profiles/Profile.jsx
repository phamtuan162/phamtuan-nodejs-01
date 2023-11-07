import React, { useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "../../core/useSelector";
import Logout from "../Logout/Logout";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

export default function Profile() {
  const form = useRef();
  const { user } = useAuth0();
  const { dispatch } = useSelector();

  const { name, picture, email, locale } = user;
  const sendEmail = async (e) => {
    e.preventDefault();
    dispatch({
      type: "loading/switch",
      payload: true,
    });
    await emailjs
      .sendForm(
        "service_xmx3j9l",
        "template_znud10n",
        form.current,
        "9byFASh_4lIUT7PAd"
      )
      .then(
        (result) => {
          toast.success("Gửi yêu cầu trợ giúp thành công");
        },
        (error) => {
          toast.error("Gửi yêu cầu trợ giúp thất bại. Vui lòng thử lại!");
        }
      );
    dispatch({
      type: "loading/switch",
      payload: false,
    });
  };
  return (
    <div className="profiles">
      <div className="profiles-inner">
        <img src={picture} alt={name} />
        <h2 className="name">Xin chào {name}!</h2>
        {locale && <p>Ngôn ngữ: {locale === "vi" ? "Tiếng Việt" : locale}</p>}
        {email && (
          <p>
            Email: <a href={`mailto:${email}`}>{email}</a>
          </p>
        )}
        <form
          ref={form}
          action=""
          className="form-container"
          onSubmit={sendEmail}
        >
          <div className="form-group">
            {email ? (
              <input
                className="form-input"
                type="email"
                name="user_email"
                id="email"
                defaultValue={email}
                required
              />
            ) : (
              <input
                className="form-input"
                type="email"
                name="user_email"
                id="email"
                defaultValue="example@email.com"
                required
              />
            )}

            <label className="form-label" htmlFor="email">
              Email của bạn*
            </label>
          </div>
          <div className="form-group">
            <input
              className="form-input"
              type="name"
              name="user_name"
              id="name"
              defaultValue={name}
              required
            />
            <label className="form-label" htmlFor="email">
              Tên của bạn*
            </label>
          </div>
          <div className="form-group">
            <textarea
              className="form-textarea"
              type="text"
              name="message"
              id="message"
              defaultValue="Tôi cần trợ giúp bài tập về nhà!"
            />
            <label className="form-label" htmlFor="message">
              Tin nhắn*
            </label>
          </div>
          <div className="form-group">
            <button type="submit" className="btn-support">
              Yêu cầu hỗ trợ!
            </button>
          </div>
        </form>
      </div>
      <Logout />
    </div>
  );
}
