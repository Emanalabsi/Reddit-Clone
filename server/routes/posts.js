const postsRouter = require("express").Router();

const {
  getAllPosts,
  addPost,
  deletePost,
  updatePost,
  getPost,
} = require("../controllers/posts");
const { isAuth } = require("../middlewares");

postsRouter.get("/", getAllPosts);

postsRouter.use(isAuth);

postsRouter.post("/new", addPost);
postsRouter.get("/:id", getPost);
// postsRouter.put("/:id", updatePost);
postsRouter.delete("/:id", deletePost);

module.exports = postsRouter;
