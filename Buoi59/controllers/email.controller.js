const model = require("../models/index");
const moment = require("moment");
const sendMail = require("../utils/mail");
const { object, string } = require("yup");
const SentEmail = model.SentEmail;

module.exports = {
  index: async (req, res) => {
    const msg = req.flash("msg");
    res.render("email", { msg, req });
  },
  handleSend: async (req, res) => {
    const schema = object({
      recipient_email: string()
        .required("Vui lòng nhập Email gửi đến")
        .email("Email không đúng định dạng"),
      title: string().required("Vui lòng nhập tiêu đề"),
      content: string().required("Vui lòng nhập nội dung"),
    });
    try {
      const body = await schema.validate(req.body, { abortEarly: false });
      const info = await sendMail(
        body.recipient_email,
        body.title,
        body.content
      );

      if (info) {
        await SentEmail.create({
          ...body,
          sender_email: "tnpham352@gmail.com",
        });
        req.flash("msg", "Gửi email thành công");
      }
    } catch (error) {
      const errors = Object.fromEntries(
        error?.inner.map((item) => [item.path, item.message])
      );

      req.flash("errors", errors);
      req.flash("old", req.body);
    }
    return res.redirect("/email");
  },
  historyEmail: async (req, res) => {
    const sentEmails = await SentEmail.findAll({
      where: {
        sender_email: "tnpham352@gmail.com",
      },
    });
    const msg = req.flash("msg");
    res.render("email/historyEmail", { msg, req, sentEmails, moment });
  },
  detailEmail: async (req, res) => {
    const { id } = req.params;
    const detailEmail = await SentEmail.findOne({
      where: {
        id,
      },
    });

    res.render("email/detailEmail", { detailEmail, moment });
  },
};
