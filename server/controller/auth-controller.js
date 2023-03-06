const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();
const {
  jwtGenerate,
  jwtRefreshTokenGenerate,
} = require("../helpers/jwtGenerate");

const salt = bcrypt.genSaltSync(+process.env.SALT);

const register = async (req, res) => {
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
    res.status(500).json(error.message);
  }
};

const login = async (req, res) => {
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
};

module.exports = { register, login };
