var express = require("express");
var router = express.Router();
const authController = require("../controllers/profile.controller");
router.get("/", authController.index);
router.post("/", authController.changeInformation);
router.get("/change-password", authController.changePassword);
router.post("/change-password", authController.handleChangePassword);

module.exports = router;
