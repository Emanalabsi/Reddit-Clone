const getUserPostsQuery = require("../database/queries/profile");

const getUserPosts = (req, res, next) => {
  const { id } = req.user;
  getUserPostsQuery(id)
    .then((result) => {
      if (result.rowCount === 0) {
        throw new CustomError("No posts found", 401);
      }
      res.status(200).json({
        error: false,
        data: result.rows,
      });
    })
    .catch((err) => next(err));
};

module.exports = getUserPosts;
