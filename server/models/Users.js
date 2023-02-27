const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 4,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
    min: 6,
  },
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
