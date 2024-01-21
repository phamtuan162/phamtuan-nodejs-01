var express = require("express");
var router = express.Router();
const authController = require("../controllers/auth.controller");
const tokenMiddleware = require("../middlewares/token.middleware");

const passport = require("passport");
router.get("/dang-nhap", authController.login);
router.post(
  "/dang-nhap",
  passport.authenticate("local", {
    failureRedirect: "/auth/dang-nhap",
    failureFlash: true,
    successRedirect: "/",
  })
);
router.get("/logout", (req, res) => {
  req.logout(() => {});
  return res.redirect("/auth/dang-nhap");
});
router.get(
  "/google/redirect",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/dang-nhap",
    failureFlash: true,
    successRedirect: "/",
  })
);

router.get("/dang-ky", authController.register);
router.post("/dang-ky", authController.handleRegister);
router.get("/forgot-password", authController.forgotPassword);
router.post("/forgot-password", authController.handleForgotPassword);
router.get(
  "/reset-password/:email/:token",
  tokenMiddleware,
  authController.resetPassword
);
router.post(
  "/reset-password/:email/:token",
  tokenMiddleware,
  authController.handleResetPassword
);
module.exports = router;
