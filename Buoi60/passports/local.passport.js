const { User } = require("../models/index");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { Op } = require("sequelize");

const LocalStrategy = require("passport-local").Strategy;
const passportLocal = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    //Xác thực email và password có tồn tại trong database hay không?
    const user = await User.findOne({
      where: {
        email: email,
        provider_id: {
          [Op.is]: null,
        },
      },
    });
    if (!user) {
      return done(null, false, { message: "Email không tồn tại" });
    }
    if (user.password) {
      const passwordHash = user.password;
      const result = bcrypt.compareSync(password, passwordHash);
      if (result) {
        return done(null, user); //Lưu user vào session
      }
    }

    done(null, false, {
      message: "Mật khẩu không chính xác",
    });
  }
);
module.exports = passportLocal;
