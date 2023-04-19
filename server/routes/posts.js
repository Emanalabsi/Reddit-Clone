const postsRouter = require("express").Router();

const {
  getAllPosts,
  addPost,
  deletePost,
  updatePost,
  getSinglePost,
} = require("../controllers/posts");

postsRouter.post("/new", addPost);

postsRouter.get("/:id", getSinglePost);
// postsRouter.put("/:id", updatePost);
postsRouter.delete("/:id", deletePost);

postsRouter.get("/", getAllPosts);

module.exports = postsRouter;
