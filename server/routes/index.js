const router = require("express").Router();

const commentsRouter = require("./comments");
const postsRouter = require("./posts");
const userRouter = require("./users");

router.use("/comments", commentsRouter);
router.use("/users", userRouter);
router.use("/posts", postsRouter);

module.exports = router;
