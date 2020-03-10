const jwt = require("jsonwebtoken");
const query = require("../db/db");
module.exports = (req, res, next) => {
  console.log(req.headers["x-access-token"]);
  jwt.verify(
    req.headers["x-access-token"],
    process.env.JWT_SECRET,
    async (err, decode) => {
      if (err)
        return res
          .status(400)
          .json({ status: 400, message: "token validation failed" });
      const result = await query.getUserById(decode.userId);
      const user = result.rows[0];
      if (!user.is_verified)
        return res
          .status(400)
          .json({ status: 400, message: "user email is not verified" });
      req.user = user;
      next();
    }
  );
};
