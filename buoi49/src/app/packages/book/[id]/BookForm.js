"use client";
import emailjs from "@emailjs/browser";
import { configEmailjs } from "@/config/config";
import { toast } from "react-toastify";
import { useRef } from "react";
const { SERVICE_ID, TEMPLATE_ID, API_KEY } = configEmailjs;

const BookForm = () => {
  const form = useRef();
  const sendEmail = async (e) => {
    e.preventDefault();

    await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, API_KEY).then(
      (result) => {
        toast.success("Bạn đã đặt thành công");
      },
      (error) => {
        toast.error("Bạn đặt thất bại. Vui lòng thử lại!");
      }
    );
    form.current.reset();
  };
  return (
    <form ref={form} action="" className="form" onSubmit={sendEmail}>
      <div className="inputBox ">
        <span>
          <h1 className="packages">Ưu đãi 30.000.000 cho 5người/3ngày</h1>
        </span>
      </div>
      <div className="inputBox ">
        <span>Tên</span>
        <input
          required
          id="name"
          type="text"
          name="user_name"
          placeholder="Please name..."
        />
      </div>
      <div className="inputBox ">
        <span>Số điện thoại</span>
        <input
          required
          id="phonenumber"
          type="text"
          name="user_phone"
          placeholder="Please Phonenumber..."
          maxLength="10"
        />
      </div>
      <div className="inputBox ">
        <span>Email</span>
        <input
          required
          id="email"
          type="email"
          name="user_email"
          placeholder="email@gmail.com"
        />
      </div>
      <div className="inputBox ">
        <span>Thời gian đi</span>
        <input required id="date" type="date" name="date" />
      </div>
      <div className="inputBox ">
        <span>
          Số người
          <input
            required
            id="peoplenumber"
            type="number"
            name="peoplenumber"
            placeholder="Số người"
            min="1"
          />
        </span>
      </div>
      <div className="inputBox ">
        <span>Tôi thanh toán bằng</span>
        <select name="payment-methods">
          <option value="momo">Momo</option>
          <option value="bank">Chuyển khoản</option>
          <option value="card">Thẻ VISA</option>
          <option value="none">Thanh toán khi đến nơi</option>
        </select>
      </div>
      <button type="submit" className="btn">
        Đặt ngay
      </button>
    </form>
  );
};

export default BookForm;
