var express = require("express");
var router = express.Router();
const query = require("../db/db");
const {
  signup,
  login,
  facebookLogin,
  googleLogin,
  forgetPassword,
  confirmCode,
  verify,
  newPassword
} = require("../controller/index");
/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/signup", signup);
router.post("/login", login);
router.post("/facebooklogin", facebookLogin);
router.post("/googlelogin", googleLogin);
router.post("/verify", verify);
router.post("/forgetPassword", forgetPassword);
router.post("/confirmcode", confirmCode);
router.post("/newPassword", newPassword);

module.exports = router;
