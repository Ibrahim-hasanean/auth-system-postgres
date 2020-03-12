const query = require("../db/db");
const bcrypt = require("bcrypt");
module.exports = {
  editeAccount: async (req, res, next) => {
    let user = req.user;
    let data = [
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.phone,
      req.body.bithday
    ];
    let updatedUser = await query.updateUser(...data, user.id);
    // console.log(updatedUser);
    res.send("user updated");
  },
  updatePassword: async (req, res, next) => {
    let user = req.user;
    let password = req.body.password;
    let newPassword = req.body.newPassword;
    let truePassword = await bcrypt.compareSync(password, user.password);
    console.log(truePassword);
    if (!truePassword)
      return res
        .status(400)
        .json({ status: 400, message: "curruent pasword is wrong" });
    if (newPassword.length < 8)
      return res
        .status(400)
        .json({ status: 400, message: "password must be atleast 8 character" });

    let createNewPassword = await query.newPassword(user.email, newPassword);
    return res.status(200).json({ status: 200, message: "password is reset" });
  }
};
