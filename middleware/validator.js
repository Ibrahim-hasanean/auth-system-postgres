const jwt = require("jsonwebtoken");
const query = require("../db/db");
const User = require("../db/User");
module.exports = (req, res, next) => {
  jwt.verify(
    req.headers["x-access-token"],
    process.env.JWT_SECRET,
    async (err, decode) => {
      if (err)
        return res
          .status(400)
          .json({ status: 400, message: "token validation failed" });
      const user = await User.findOne({ where: { id: decode.userId } });
      if (!user.is_verified)
        return res
          .status(400)
          .json({ status: 400, message: "user email is not verified" });
      req.user = user;
      next();
    }
  );
};
