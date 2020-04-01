const query = require("../db/db");
const User = require("../db/User");
module.exports = async (email, phone, code) => {
  if (!user) return Promise.reject("user not found");
  if (code !== user.verification_code) return Promise.reject("code is wrong");
  return Promise.resolve(user);
};
