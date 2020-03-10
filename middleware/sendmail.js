const nodemailer = require("nodemailer");
const createCode = require("crypto-random-string");
const query = require("../db/db");
require("dotenv").config();
module.exports = async (to, subject) => {
  let code = createCode({ length: 4 });
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.email,
      pass: process.env.password
    }
  });

  let info = await transporter.sendMail({
    from: process.env.email,
    to: to,
    subject: subject,
    text: "your code: ",
    html: `<b>${code}</b>`
  });
  let setCode = await query.addCode(to, code);
  return info;
};
