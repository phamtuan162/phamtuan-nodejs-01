const model = require("../models/index");
const User = model.User;

module.exports = {
  index: async (req, res) => {
    const user = req.session.user;
    // const isLogin = req.session.isLogin;
    // if (!isLogin) {
    //   return res.redirect("/auth/dang-nhap");
    // }
    res.render("", { user });
  },
};
