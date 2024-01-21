module.exports = (req, res, next) => {
  const pathname = req.baseUrl + req.path;

  if (req.user) {
    return next();
  }

  return res.redirect("/auth/dang-nhap");
};
