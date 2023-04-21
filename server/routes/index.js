const router = require("express").Router();

const commentsRouter = require("./comments");
const postsRouter = require("./posts");
const userRouter = require("./users");
const votesRouter = require("./votes");

router.use("/comments", commentsRouter);
router.use("/users", userRouter);
router.use("/posts", postsRouter);
router.use("/votes", votesRouter);

module.exports = router;
