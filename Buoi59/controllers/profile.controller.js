const model = require("../models/index");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const User = model.User;
const { object, string } = require("yup");

module.exports = {
  index: async (req, res) => {
    let user = req.session.user;
    const id = user.id;
    user = await User.findOne({
      where: { id },
    });
    const msg = req.flash("msg");

    res.render("profile/index", { user, msg, req });
  },
  changeInformation: async (req, res) => {
    let user = req.session.user;
    const id = user.id;
    const schema = object({
      email: string()
        .required("Không được để trống email")
        .email("Email không đúng định dạng")
        .test("unique", "Email đã tồn tại trên hệ thống", async (value) => {
          const user = await User.findOne({
            where: {
              email: value,
              id: {
                [Op.not]: +id,
              },
            },
          });
          return user ? false : true;
        }),
      name: string().required("Không được để trống tên"),
    });
    try {
      const body = await schema.validate(req.body, { abortEarly: false });
      await User.update(
        {
          email: body.email,
          name: body.name,
        },
        {
          where: { id },
        }
      );
      req.flash("msg", "Thay đổi thông tin thành công");
    } catch (error) {
      const errors = Object.fromEntries(
        error?.inner.map((item) => [item.path, item.message])
      );

      req.flash("errors", errors);
      req.flash("old", req.body);
    }
    return res.redirect("/profile");
  },
  changePassword: async (req, res) => {
    const msg = req.flash("msg");

    res.render("profile/changePassword", { req, msg });
  },
  handleChangePassword: async (req, res) => {
    let user = req.session.user;
    const id = user.id;
    const schema = object({
      oldPassword: string()
        .required("Vui lòng nhập mật khẩu cũ")
        .min(6, "Mật khẩu không được ít hơn 6 ký tự")
        .test("password", "Mật khẩu không chính xác", async (value) => {
          const checkPassword = await bcrypt.compare(value, user?.password);
          return checkPassword;
        }),
      newPassword: string()
        .required("Vui lòng nhập mật khẩu")
        .min(6, "Mật khẩu không được ít hơn 6 ký tự"),

      confirmPassword: string()
        .required("Vui lòng nhập lại mật khẩu ")
        .min(6, "Mật khẩu không được ít hơn 6 ký tự")
        .test("confirmPassword", "Không khớp với mật khẩu mới", (value) => {
          return value === req.body?.newPassword;
        }),
    });
    try {
      const body = await schema.validate(req.body, { abortEarly: false });
      const hashPassword = await bcrypt.hash(body.newPassword, salt);
      await User.update(
        {
          password: hashPassword,
        },
        {
          where: { id },
        }
      );
      req.flash("msg", "Thay đổi mật khẩu thành công");
    } catch (error) {
      const errors = Object.fromEntries(
        error?.inner.map((item) => [item.path, item.message])
      );

      req.flash("errors", errors);
      req.flash("old", req.body);
    }
    return res.redirect("/profile/change-password");
  },
};
