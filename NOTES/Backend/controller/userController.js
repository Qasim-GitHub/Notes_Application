const asynchandler = require("express-async-handler"); // handled all errors
const User = require("../model/userModel");
const generatToken = require("../utils/generateToken");

const register = asynchandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400);
      throw new Error("Email already exist");
    }

    const user = await User.create({
      name,
      email,
      password,
      pic,
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: generatToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("User Not Rigister");
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

const userLogin = asynchandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generatToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password!");
  }
});

const userProfile = asynchandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updateProfile = await user.save();

    res.json({
      _id: updateProfile._id,
      name: updateProfile.name,
      email: updateProfile.email,
      pic: updateProfile.pic,
    });
  } else {
    res.status("404");
    throw new Error("User Profile not found");
  }
});

module.exports = { register, userLogin, userProfile };
