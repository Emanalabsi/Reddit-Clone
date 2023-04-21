const getِUserPostsQuery = require("../database/queries/profile");

const getUserPosts = (req, res, next) => {
  const { id } = req.user;
  getِUserPostsQuery(id)
    .then((result) => {
      if (result.rowCount === 0) {
        throw new CustomError("No posts found", 401);
      }
    })
    .then((data) =>
      res.json({
        error: false,
        data: data.rows,
      })
    )
    .catch((err) => next(err));
};

module.exports = getUserPosts;
