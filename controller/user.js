const query = require("../db/db");
const bcrypt = require("bcrypt");
const validator = require("validator");
const User = require("../db/User");
const Address = require("../db/address");
const user_address = require("../db/user_address");
module.exports = {
  editeAccount: async (req, res, next) => {
    let user = req.user;
    let first_name = req.body.firstName || user.first_name,
      last_name = req.body.lastName || user.last_name,
      phone = req.body.phone || user.phone,
      email = req.body.email || user.email,
      date_of_birth = req.body.birthday || user.date_of_birth;

    if (email && !validator.isEmail(String(email))) {
      return res
        .status(400)
        .json({ status: 400, message: "email is not valid" });
    }
    if (phone && phone.length != 10) {
      return res
        .status(400)
        .json({ status: 400, message: "phone is not valid" });
    }
    let updatedUser = await User.update(
      {
        first_name,
        last_name,
        phone,
        date_of_birth,
      },
      { where: { id: user.id } }
    );
    console.log(updatedUser);
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

    newPassword = bcrypt.hashSync(newPassword, 12);
    let createNewPassword = await User.update(
      { password: newPassword },
      { where: { id: user.id } }
    );
    return res.status(200).json({ status: 200, message: "password is reset" });
  },
  addAddress: async (req, res, next) => {
    const user = req.user;
    let { city, block, street, details } = req.body;
    let addAddress = await Address.create({ city, block, street, details });
    let newAddress = await user.addAddress(addAddress);
    const userAddress = await user.getAddresses();
    console.log(JSON.stringify(newAddress, null, 4));
    res.status(200).json({ status: 200, message: "address is added" });
  },
};
