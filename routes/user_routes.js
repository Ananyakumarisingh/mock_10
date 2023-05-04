const controller = require("../controller/user.controller");
const express = require("express");
const userRouter = express.Router();

userRouter.post("/register", controller.registerUser);
userRouter.post("/login", controller.loginUser);

module.exports = userRouter;
