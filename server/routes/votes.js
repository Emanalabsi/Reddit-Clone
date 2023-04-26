const votesRouter = require("express").Router();

const { vote, countVotes } = require("../controllers/votes");

const { isAuth } = require("../middlewares");

votesRouter.post("/:postId/:vote", isAuth, vote);
votesRouter.get("/count/:postId", countVotes);

module.exports = votesRouter;
