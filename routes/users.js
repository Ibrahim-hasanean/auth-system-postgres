var express = require("express");
var router = express.Router();
const { editeAccount, updatePassword } = require("../controller/user");
/* GET users listing. */
router.get("/private", function(req, res, next) {
  res.send(`herllo from private route mr ${req.user.first_name}`);
});
router.patch("/editeaccount", editeAccount);
router.patch("/newpassword", updatePassword);
module.exports = router;
