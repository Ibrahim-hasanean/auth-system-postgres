const query = require("../db/db");
module.exports = async (email, phone, code) => {
  let user;
  if (email) {
    user = await query.getUser(email);
  }
  if (phone) {
    user = await query.getUserByPhone(phone);
  }
  console.log(phone);
  if (!user) return Promise.reject("user not found");
  if (code !== user.verification_code) return Promise.reject("code is wrong");
  return Promise.resolve(user);
};
