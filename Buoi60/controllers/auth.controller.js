const { User } = require("../models/index");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const { Op } = require("sequelize");
const sendMail = require("../utils/mail");
const { object, string } = require("yup");

const generateToken = () => {
  return crypto.randomBytes(16).toString("hex");
};

module.exports = {
  login: async (req, res) => {
    const error = req.flash("error");
    res.render("auth/login", { error });
  },
  register: async (req, res) => {
    const msg = req.flash("msg");
    res.render("auth/register", { req, msg });
  },
  handleRegister: async (req, res) => {
    const schema = object({
      email: string()
        .required("Vui lòng nhập email")
        .email("Email không đúng định dạng")
        .test("unique", "Email đã tồn tại trên hệ thống", async (value) => {
          const user = await User.findOne({ where: { email: value } });
          return user ? false : true;
        }),
      password: string()
        .required("Vui lòng nhập mật khẩu")
        .min(6, "Mật khẩu không được ít hơn 6 ký tự"),
      name: string().required("Vui lòng nhập tên"),
    });
    try {
      const body = await schema.validate(req.body, { abortEarly: false });
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashPassword = await bcrypt.hash(body.password, salt);
      await User.create({
        name: body.name,
        email: body.email,
        password: hashPassword,
      });
      req.flash("msg", "Đăng ký thành công");
    } catch (error) {
      const errors = Object.fromEntries(
        error?.inner.map((item) => [item.path, item.message])
      );

      req.flash("errors", errors);
      req.flash("old", req.body);
    }
    return res.redirect("/auth/dang-ky");
  },
  forgotPassword: async (req, res) => {
    const msg = req.flash("msg");
    res.render("auth/forgotPassword", { req, msg });
  },
  handleForgotPassword: async (req, res) => {
    const { email } = req.body;

    const schema = object({
      email: string()
        .required("Vui lòng nhập email")
        .email("Email không đúng định dạng")
        .test("unique", "Email không tồn tại", async (value) => {
          const user = await User.findOne({
            where: {
              email: value,
              provider_id: {
                [Op.is]: null,
              },
            },
          });
          return user ? true : false;
        }),
    });
    try {
      const body = await schema.validate(req.body, { abortEarly: false });
      const token = jwt.sign({ id: generateToken() }, "secret", {
        expiresIn: "15m",
      });
      const link = `${req.protocol}://${req.get(
        "host"
      )}/auth/reset-password/${email}/${token}`;
      const html = `<a href="${link}">Verify password</a>`;

      await sendMail(body?.email, "verify password", html);

      req.flash("msg", "Gửi thành công hãy kiểm tra email");
    } catch (error) {
      const errors = Object.fromEntries(
        error?.inner.map((item) => [item.path, item.message])
      );

      req.flash("errors", errors);
      req.flash("old", req.body);
    }
    return res.redirect("/auth/forgot-password");
  },
  resetPassword: async (req, res) => {
    const msg = req.flash("msg");
    res.render("auth/resetPassword", { req, msg });
  },
  handleResetPassword: async (req, res) => {
    const { token, email } = req.params;

    const schema = object({
      newPassword: string()
        .required("Vui lòng nhập mật khẩu mới")
        .min(6, "Mật khẩu không được ít hơn 6 ký tự"),

      confirmPassword: string()
        .required("Vui lòng nhập lại mật khẩu ")
        .test("confirmPassword", "Không khớp với mật khẩu mới", (value) => {
          return value === req.body?.newPassword;
        }),
    });
    try {
      const body = await schema.validate(req.body, { abortEarly: false });
      const decoded = jwt.verify(token, "secret");
      if (decoded) {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPassword = await bcrypt.hash(body.newPassword, salt);

        await User.update(
          {
            password: hashPassword,
          },
          {
            where: { email },
          }
        );
        const newToken = jwt.sign({ id: generateToken() }, "secret", {
          expiresIn: "1s",
        });
        req.flash("msg", "Đặt lại mật khẩu thành công");
        return res.redirect(`/auth/reset-password/${email}/${newToken}`);
      } else {
        return res.send(
          "<h1>Liên kết hết hạn hoặc không tồn tại, vui lòng thử lại</h1>"
        );
      }
    } catch (error) {
      const errors = Object.fromEntries(
        error?.inner.map((item) => [item.path, item.message])
      );

      req.flash("errors", errors);
      req.flash("old", req.body);
    }
    return res.redirect(`/auth/reset-password/${email}/${token}`);
  },
};
