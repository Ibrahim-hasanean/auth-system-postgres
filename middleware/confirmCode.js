const query = require("../db/db");
module.exports = async (email, code) => {
  if (!email) return Promise.reject("email must be provided");
  let result = await query.getUser(email);
  let user = result.rows[0];
  if (!user) return Promise.reject("email not found");
  if (code !== user.verification_code) return Promise.reject("code is wrong");
  return Promise.resolve(user);
};
