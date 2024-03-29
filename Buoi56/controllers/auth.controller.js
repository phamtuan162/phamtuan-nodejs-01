const bcrypt = require("bcrypt");
const saltRounds = 10;
const { object, string } = require("yup");
const model = require("../models/index");
const User = model.User;
module.exports = {
  login: async (req, res) => {
    if (req.session.isLogin) {
      return res.redirect("/");
    }
    const msg = req.flash("msg");
    res.render("auth/login", { req, msg });
  },
  handleLogin: async (req, res) => {
    const { email, password } = req.body;
    const schema = object({
      email: string()
        .required("Vui lòng nhập email")
        .email("Email không đúng định dạng"),
      password: string()
        .required("Vui lòng nhập mật khẩu")
        .min(6, "Mật khẩu không được ít hơn 6 ký tự"),
    });

    try {
      const body = await schema.validate(req.body, { abortEarly: false });
      const user = await User.findOne({ where: { email: body.email } });

      req.flash("old", req.body);
      if (!user || !(await bcrypt.compare(body.password, user.password))) {
        req.flash("msg", "Email hoặc mật khẩu không chính xác");
        return res.redirect("/auth/dang-nhap");
      }
      if (user.status === false) {
        req.flash("msg", "Tài khoản chưa được kích hoạt");
        return res.redirect("/auth/dang-nhap");
      }

      req.session.isLogin = true;
      req.session.user = user;

      return res.redirect("/");
    } catch (error) {
      const errors = Object.fromEntries(
        error?.inner.map((item) => [item.path, item.message])
      );

      req.flash("errors", errors);
      req.flash("old", req.body);
      return res.redirect("/auth/dang-nhap");
    }
  },
  register: async (req, res) => {
    if (req.session.isLogin) {
      return res.redirect("/");
    }
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
  logout: async (req, res) => {
    req.session.isLogin = false;
    return res.redirect("/");
  },
};
