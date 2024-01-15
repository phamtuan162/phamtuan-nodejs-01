const authMiddleware = (req, res, next) => {
  if (!req.session.isLogin) {
    res.redirect("/auth/dang-nhap");
  }
  next();
};

module.exports = authMiddleware;
