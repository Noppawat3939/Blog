const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const salt = bcrypt.genSaltSync(+process.env.SALT);

router.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const findUser = await User.findOne({ username });

    if (findUser) {
      res.json({
        register: false,
        message: `Username ${username} already exists`,
      });
    }

    if (!findUser) {
      await User.create({
        username,
        email,
        password: bcrypt.hashSync(password, salt),
      });

      res.json({ register: true, message: "Register is success" });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

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

router.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const foundUser = await User.findOne({ username });
    const match = bcrypt.compareSync(password, foundUser.password);

    if (match) {
      const accessToken = jwtGenerate(foundUser);

      const refreshToken = jwtRefreshTokenGenerate(foundUser);

      res.json({ login: true, token: { accessToken, refreshToken } });
    }

    if (!match) {
      res.status(401).json({
        login: false,
        message: "Unauthorized",
      });
    }
  } catch (error) {
    res.status(500).json({ error: true, message: "server error" });
  }
});

module.exports = router;
