const router = require("express").Router();

const commentsRouter = require("./comments");
const postsRouter = require("./posts");
const profileRouter = require("./profile");
const userRouter = require("./users");
const votesRouter = require("./votes");

router.use("/comments", commentsRouter);
router.use("/users", userRouter);
router.use("/posts", postsRouter);
router.use("/votes", votesRouter);
router.use("/profile", profileRouter);

module.exports = router;
