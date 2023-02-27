const express = require("express");
const router = express.Router();
const { config } = require("dotenv");
config();
const verifyJwt = require("../middleware/jwtValidate");
const User = require("../models/Users");

router.post("/api/me", verifyJwt, (req, res) => {
  const { user } = req;
  let userInfo = {
    id: user._id,
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    image: user.image,
  };

  res.json(userInfo);
});

router.put("/api/update-profile", async (req, res) => {
  const { id, username, firstName, lastName, email, image } = req.body;

  if (!id) res.status(400).send({ update: false, message: "id is required" });
  try {
    const user = await User.findOne({ _id: id }).exec();
    user.username = username;
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.image = image;

    await user.save();

    const response = {
      update: true,
      userInfo: {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    };

    res.json(response);
  } catch (error) {
    res.status(401).send({ update: false, message: error });
  }
});

module.exports = router;
