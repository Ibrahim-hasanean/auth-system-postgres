const query = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendmail = require("../middleware/sendmail");
const confirmCode = require("../middleware/confirmCode.js");
module.exports = {
  signup: async (req, res, next) => {
    let { email, password, city } = req.body;
    let emailExist = await query.getUser(email);
    if (emailExist.rows.length > 0)
      return res
        .status(400)
        .json({ status: 409, message: "email is already singed up" });
    let newUser = await query.createUser(email, password, city);
    let sendCode = await sendmail(email, "email verification");
    res
      .status(200)
      .json({ status: 200, message: "sign up success and code is sent" });
  },
  login: async (req, res, next) => {
    let { email, password } = req.body;
    const result = await query.getUser(email);
    const user = result.rows[0];

    if (!user) return next({ status: 400, message: "user not found" });

    let truePassword = await bcrypt.compareSync(password, user.password);
    if (!truePassword)
      return res
        .status(400)
        .json({ status: 400, message: "password is wrong" });

    let token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "12h"
    });
    console.log(user.id);
    return res.status(200).json({
      status: 200,
      message: "login success",
      token,
      user: {
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phoneNumber: user.phone,
        birthday: user.birthday,
        location: user.location
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
    let { email, code } = req.body;
    confirmCode(email, code)
      .then(async user => {
        let verify = await query.trueVerified(user.id);
        return res.status(200).json({ status: 200, message: "code is true" });
      })
      .catch(err => {
        res.status(400).json({ status: 400, message: err });
      });
  },
  forgetPassword: async (req, res, next) => {
    let { email } = req.body;
    const result = await query.getUser(email);
    const user = result.rows[0];
    if (!user) return next({ status: 400, message: "user not found" });
    let sendCode = await sendmail(email, "forget password");
    res.status(200).json({ status: 200, message: "code is sent" });
  },
  verify: async (req, res, next) => {
    let { email, code } = req.body;
    confirmCode(email, code)
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
    let { email, code, password } = req.body;

    let result = await (await query.getUser(email)).rows;
    let user = result[0];
    console.log(password);
    if (!user)
      return res.status(400).json({ status: 400, message: "user not found" });
    if (code !== user.verification_code)
      return res.status(400).json({ status: 400, message: "code is wrong" });
    let newUser = await query.newPassword(email, password);
    return res
      .status(200)
      .json({ status: 200, message: "password reset success" });
  }
};
