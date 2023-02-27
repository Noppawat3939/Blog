const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const User = require("../models/Users");

const verifyJwt = (req, res, next) => {
  const { authorization: token } = req.headers;

  try {
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
      if (!err) {
        const user = await User.findById(decoded.id);

        req.user = user;
        next();
      }
    });
  } catch (error) {
    res.status(403).json({ message: "Forbidden" });
  }
};

module.exports = verifyJwt;
