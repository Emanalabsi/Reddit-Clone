const profileRouter = require("express").Router();

const getUserPosts = require("../controllers/profile");
const { isAuth } = require("../middlewares");

profileRouter.get("/posts", isAuth, getUserPosts);

module.exports = profileRouter;
