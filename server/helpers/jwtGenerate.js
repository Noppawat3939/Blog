const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
config();

const jwtGenerate = (user) => {
  const accessToken = jwt.sign(
    { name: user.username, id: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30m" }
  );

  return accessToken;
};

const jwtRefreshTokenGenerate = (user) => {
  const refreshToken = jwt.sign(
    { name: user.username, id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  return refreshToken;
};

module.exports = { jwtGenerate, jwtRefreshTokenGenerate };
