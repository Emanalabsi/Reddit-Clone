const profileRouter = require("express").Router();

const getUserPosts = require("../controllers/profile");

profileRouter.get("/:id", getUserPosts);

module.exports = profileRouter;
