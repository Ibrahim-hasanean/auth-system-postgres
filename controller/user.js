const query = require("../db/db");
const bcrypt = require("bcrypt");
const validator = require("validator");
module.exports = {
  editeAccount: async (req, res, next) => {
    let user = req.user;
    let { firstName, lastName, email, phone, bithday } = req.body;
    if (!email && !phone) {
      return res
        .status(400)
        .json({ status: 400, message: "email or phone must be added" });
    }
    if (!validator.isEmail(String(email))) {
      return res
        .status(400)
        .json({ status: 400, message: "email is not valid" });
    }
    let updatedUser = await query.updateUser(
      firstName,
      lastName,
      email,
      phone,
      bithday,
      user.id
    );
    // console.log(updatedUser);
    res.status(200).json({ status: 200, message: "account edite success" });
  },
  updatePassword: async (req, res, next) => {
    let user = req.user;
    let password = req.body.password;
    let newPassword = req.body.newPassword;
    let isTruePassword = await bcrypt.compareSync(password, user.password);
    if (!isTruePassword)
      return res
        .status(400)
        .json({ status: 400, message: "curruent pasword is wrong" });
    if (newPassword.length < 8)
      return res
        .status(400)
        .json({ status: 400, message: "password must be atleast 8 character" });

    let createNewPassword = await query.newPassword(user.id, newPassword);
    return res.status(200).json({ status: 200, message: "password is reset" });
  },
  addAddress: async (req, res, next) => {
    try {
      let user = req.user;
      let data = [
        req.body.city,
        req.body.block,
        req.body.street,
        req.body.details
      ];
      let addAddress = await query.addAddress(user.id, ...data);
      res.status(200).json({ status: 200, message: "address is added" });
    } catch (e) {
      res.status(400).json({ status: 400, message: e.message });
    }
  }
};
