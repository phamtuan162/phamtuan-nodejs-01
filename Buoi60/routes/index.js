var express = require("express");
var router = express.Router();
const sendMail = require("../utils/mail");
const homeController = require("../controllers/home.controller");
/* GET home page. */
router.get("/", homeController.index);

// router.get("/send-mail", async function (req, res, next) {
//   const info = await sendMail(
//     "phamtuan1622002@gmail.com",
//     "Hello bạn",
//     "Tôi là Tuấn"
//   );
//   res.send("Gửi email");
// });

module.exports = router;
