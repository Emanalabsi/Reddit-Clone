const commentsRouter = require("express").Router();
const {
  getComments,
  addComment,
  deleteComment,
} = require("../controllers/comments");
const { isAuth } = require("../middlewares");

commentsRouter.use(isAuth);

commentsRouter.post("/:postId", addComment);
commentsRouter.get("/:postId", getComments);
commentsRouter.delete("/:postId", deleteComment);

module.exports = commentsRouter;
