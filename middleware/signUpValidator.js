const validator = require("validator");
const query = require("../db/db");
module.exports = async (req, res, next) => {
  let { email, phone, password } = req.body;
  let user;
  if (email) {
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ status: 400, message: "email is not valid" });
    }
    user = await query.getUser(email);
  }
  if (phone) {
    if (!validator.isNumeric(phone)) {
      return res
        .status(400)
        .json({ status: 400, message: "phone is not valid" });
    }
    user = await query.getUserByPhone(phone);
  }
  if (user) {
    return res.status(409).json({
      status: 409,
      message: "user is already signed up"
    });
  }
  if (!password) {
    return res
      .status(401)
      .json({ status: 401, message: "password is required" });
  } else {
    if (String(password).length < 8) {
      return res.status(401).json({
        status: 401,
        message: "password must be 8 character"
      });
    }
    if (!validator.isAlphanumeric(password)) {
      return res.status(401).json({
        status: 401,
        message: "password must contain numbers and letters"
      });
    }
  }
  next();
};
