const router = require("express").Router();
const dashboard = require("../controller/dashhboard");
router.get("/", dashboard);
module.exports = router;
