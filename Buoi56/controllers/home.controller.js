const model = require("../models/index");
const User = model.User;

module.exports = {
  index: async (req, res) => {
    const user = req.session.user;
    const userAgent = req.useragent;

    res.render("", { user });
  },
};
