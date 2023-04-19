const router = require("express").Router();

const postsRouter = require("./posts");
const userRouter = require("./users");

router.use("/users", userRouter);
router.use("/posts", postsRouter);

module.exports = router;
