const query = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendmail = require("../middleware/sendmail");
const confirmCode = require("../middleware/confirmCode.js");
const sendSMS = require("../utils/sendSMS.js");
module.exports = {
  signup: async (req, res, next) => {
    let { phone, email, password, city } = req.body;
    if (email) {
      let newUser = await query.createUser(email, password, city);
      console.log(newUser);
      let sendCodeToEmail = await sendmail(newUser, "email verification");
      res.status(200).json({
        status: 200,
        message: "sign up success and code is sent to your email"
      });
    }
    if (phone) {
      let newUser = await query.createUserWithPhone(phone, password, city);
      console.log(newUser);
      let sendCodeTOPhone = await sendSMS(newUser);
      res.status(200).json({
        status: 200,
        message: "sign up success and code is sent to your phone"
      });
    }
  },
  login: async (req, res, next) => {
    let { phone, email, password } = req.body;
    let user;
    if (email) {
      user = await query.getUser(email);
    } else if (phone) {
      user = await query.getUserByPhone(phone);
    }
    if (!user) return next({ status: 400, message: "user not found" });
    let truePassword = await bcrypt.compareSync(password, user.password);
    if (!truePassword)
      return res
        .status(401)
        .json({ status: 401, message: "password is wrong" });
    if (!user.is_verified)
      return res
        .status(400)
        .json({ status: 400, message: "user email is not verified" });
    let token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "12h"
    });
    return res.status(200).json({
      status: 200,
      message: "login success",
      token,
      user: {
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phoneNumber: user.phone,
        birthday: user.date_of_birth,
        city: user.location
      }
    });
  },
  facebookLogin: async (req, res, next) => {
    let { userData } = req.body;
    console.log(userData);
    let { email, name, id } = userData;
    let result = await query.getUser(email);
    console.log(result);
    let userExist = result.rows[0];
    if (!userExist) {
      let newUser = await query.createFcUser(email, name, id);
      let token = jwt.sign({ userID: newUser.id }, "my jwt secret key", {
        expiresIn: "1h"
      });
      return res
        .status(200)
        .json({ status: 200, message: "first facebook login success", token });
    }
    let token = jwt.sign({ userID: userExist.id }, "my jwt secret key", {
      expiresIn: "1h"
    });
    return res
      .status(200)
      .json({ status: 200, message: "facebook login success", token });
  },
  googleLogin: async (req, res, next) => {
    let { userData } = req.body;
    let { email, name, id } = userData;
    let result = await query.getUser(email);
    let userExist = result.rows[0];
    if (!userExist) {
      let newUser = await query.createGoogleUser(email, name, id);
      let token = jwt.sign({ userID: newUser.id }, "my jwt secret key", {
        expiresIn: "1h"
      });
      return res
        .status(200)
        .json({ status: 200, message: "first google login success", token });
    }

    let token = jwt.sign({ userID: userExist.id }, "my jwt secret key", {
      expiresIn: "1h"
    });
    return res
      .status(200)
      .json({ status: 200, message: "google login success", token });
  },
  confirmCode: async (req, res, next) => {
    let { email, phone, code } = req.body;
    confirmCode(email, phone, code)
      .then(async user => {
        let verify = await query.trueVerified(user.id);
        return res.status(200).json({ status: 200, message: "code is true" });
      })
      .catch(err => {
        res.status(400).json({ status: 400, message: err });
      });
  },
  forgetPassword: async (req, res, next) => {
    let { email, phone } = req.body;
    let user;
    if (email) {
      user = await query.getUser(email);
      let sendCode = await sendmail(user, "forget password");
    }
    if (phone) {
      user = await query.getUserByPhone(phone);
      let sendCode = await sendSMS(user);
    }
    if (!user)
      return res.status(400).json({ status: 400, message: "user not found" });
    res.status(200).json({ status: 200, message: "code is sent" });
  },
  verify: async (req, res, next) => {
    let { phone, email, code } = req.body;
    confirmCode(email, phone, code)
      .then(async user => {
        let verify = await query.trueVerified(user.id);
        return res
          .status(200)
          .json({ status: 200, message: "email is verified" });
      })
      .catch(err => {
        res.status(400).json({ status: 400, message: err });
      });
  },
  newPassword: async (req, res, next) => {
    let { email, phone, code, password } = req.body;
    let user;
    if (email) {
      user = await query.getUser(email);
    }
    if (phone) {
      user = await query.getUserByPhone(phone);
    }
    console.log(user);
    if (!user)
      return res.status(400).json({ status: 400, message: "user not found" });
    if (code !== user.verification_code)
      return res.status(400).json({ status: 400, message: "code is wrong" });
    let newUser = await query.newPassword(user.id, password);
    return res
      .status(200)
      .json({ status: 200, message: "password reset success" });
  }
};
