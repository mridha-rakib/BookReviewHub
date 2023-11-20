const express = require("express");
const userRouter = express.Router();
const {
  loginHandler,
  registrationHandler,
  profileCtrl,
} = require("../controller/userController");
const protected = require("../middlewares/protected");

userRouter.post("/register", registrationHandler);
userRouter.post("/login", loginHandler);
userRouter.get("/profile", protected, profileCtrl);

module.exports = userRouter;
