const {
  getAllCommentsQuery,
  addCommentQuery,
  deleteCommentQuery,
} = require("../database/queries/comments");

const addComment = (req, res) => {
  const { content } = req.body;
  const { id } = req.user;
  const { postId } = req.params;
  addCommentQuery(content, id, postId).then((data) => {
    res.json({
      error: false,
      message: "your comment created succesfully",
      data: data.rows,
    });
  });
};

const getComments = (req, res, next) => {
  const { postId } = req.params;

  getAllCommentsQuery(postId)
    .then((data) =>
      res.json({
        error: false,
        message: data.rows,
      })
    )
    .catch((err) => next(err));
};

const deleteComment = (req, res, next) => {
  const { postId } = req.params;
  deleteCommentQuery(postId)
    .then(() =>
      res.status(200).json({
        error: false,
        message: "comment has been deleted successfully!",
      })
    )
    .catch((err) => next(err));
};

module.exports = { getComments, addComment, deleteComment };
