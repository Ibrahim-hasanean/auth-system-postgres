var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send(`herllo from private route mr ${req.user.name}`);
});

module.exports = router;
