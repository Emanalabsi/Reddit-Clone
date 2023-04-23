const {
  getAllPostsQuery,
  addPostQuery,
  deletePostQuery,
  getPostByIdQuery,
  updatePostQuery,
} = require("../database/queries/posts");

const { CustomError } = require("../utils");

const { postSchema, updatePostSchema } = require("../utils/validation");

const getPost = (req, res, next) => {
  const { id } = req.params;
  getPostByIdQuery(id)
    .then((result) => {
      if (result.rowCount === 0) {
        throw new CustomError("Post not found", 401);
      }
      res.json({ error: false, message: result.rows });
    })
    .catch((err) => next(err));
};

const getAllPosts = (req, res, next) => {
  getAllPostsQuery()
    .then((result) => {
      if (result.rowCount === 0) {
        throw new CustomError("Posts not found", 401);
      }
      res.json({
        error: false,
        message: result.rows,
      });
    })
    .catch((err) => next(err));
};

const addPost = (req, res, next) => {
  const { id } = req.user;
  const { title, description, media } = req.body;
  postSchema
    .validateAsync({ title, description, media })
    .then((validated) => addPostQuery(validated, id))
    .then((result) => {
      if (result.rowCount === 1) {
        return res.json({ error: false, message: "Post created" });
      }
      throw new CustomError("Failed to create post", 401);
    })
    .catch((err) => next(err));
};

const deletePost = (req, res, next) => {
  const { id } = req.params;
  deletePostQuery(id)
    .then((result) =>
      res.json({ error: false, message: `${result.rowCount} row(s) deleted` })
    )
    .catch((err) => next(err));
};

const updatePost = (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;
  getPostByIdQuery(id)
    .then((post) => {
      if (post.rowCount === 0) {
        throw new CustomError(401, "Post not found");
      }
      return post.rows;
    })
    .then(() => {
      updatePostSchema.validateAsync({ title, description });
    })
    .then(() => updatePostQuery(title, description, id))
    .then(() => {
      return res.json({
        error: false,
        message: `Post with ID ${id} successfully updated`,
      });
    })
    .catch((err) => next(err));
};

module.exports = {
  getAllPosts,
  addPost,
  deletePost,
  getPost,
  updatePost,
};
