const votesRouter = require("express").Router();

const vote = require("../controllers/votes");

const { isAuth } = require("../middlewares");

votesRouter.post("/:postId/:vote", isAuth, vote);

module.exports = votesRouter;
