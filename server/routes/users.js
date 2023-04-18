const userRouter = require("express").Router();

const { signup, login, logout } = require("../controllers");

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/logout", logout);

module.exports = userRouter;
