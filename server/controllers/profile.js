const { getِUserPostsQuery } = require("../database/queries/posts");

const getUserPosts = (req, res, next) => {
  const { id } = req.user;
  getِUserPostsQuery().then();
};

module.exports = getUserPosts;
