const express = require("express");

const {
  register,
  userLogin,
  userProfile,
} = require("../controller/userController");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(userLogin);
router.route("/:id/profile").put(userProfile);

module.exports = router;
