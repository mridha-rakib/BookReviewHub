const bcrypt = require("bcrypt");
const User = require("../models/User");
const appErr = require("../utils/appErr");

const registrationHandler = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return next(appErr("All fields are required"));
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return next(appErr("User already exists"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword });
    const user = await newUser.save();
    res.status(201).json({
      message: "Customer registration successfully! Now you can Login!",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const loginHandler = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return next(appErr("Email and password fields are required"));
    }
    const userFound = await User.findOne({ username });

    if (!userFound) return next(appErr("Invalid Login credentials"));

    const isPasswordValid = await bcrypt.compare(password, userFound.password);

    if (!isPasswordValid) {
      return res.json({
        status: "failed",
        data: "Invalid Login credentials",
      });
    }

    req.session.userAuth = userFound._id;
    res.json({
      status: "success",
      data: userFound,
    });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).send("Internal Server Error");
  }
};

//profile
const profileCtrl = async (req, res) => {
  try {
    const userId = req.session.userAuth;

    const user = await User.findById(userId);

    res.json({
      status: "success",
      user: user,
    });
  } catch (error) {
    res.json(error);
  }
};

//logout
const logoutCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "User logout",
    });
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  registrationHandler,
  loginHandler,
  profileCtrl,
  logoutCtrl,
};
