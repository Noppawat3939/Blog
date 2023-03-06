const express = require("express");
const router = express.Router();
const verifyJwt = require("../middleware/jwtValidate");
const { getProfile, updateProfile } = require("../controller/user-controller");

router.post("/api/me", verifyJwt, getProfile);

router.put("/api/update-profile", updateProfile);

module.exports = router;
