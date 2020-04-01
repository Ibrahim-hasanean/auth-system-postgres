const validator = require("validator");
const query = require("../db/db");
const Op = require("sequelize").Op;
const User = require("../db/User");
module.exports = async (req, res, next) => {
  let { email, phone, password } = req.body;
  let user = await User.findOne({
    where: {
      [Op.or]: [{ email: String(email) }, { phone: String(phone) }]
    }
  });
  if (user)
    return res
      .status(409)
      .json({ status: 409, message: "user is already signed up" });

  if (email && !validator.isEmail(email)) {
    return res.status(400).json({ status: 400, message: "email is not valid" });
  }
  if (phone && !validator.isNumeric(phone)) {
    return res.status(400).json({ status: 400, message: "phone is not valid" });
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
