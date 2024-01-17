var express = require("express");
var router = express.Router();
const emailController = require("../controllers/email.controller");
router.get("/", emailController.index);
router.post("/", emailController.handleSend);
router.get("/history-email", emailController.historyEmail);
router.get("/detail-email/:id", emailController.detailEmail);

module.exports = router;
