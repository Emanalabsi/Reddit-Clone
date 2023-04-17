const connection = require("../config");

const addPostQuery = (postData) => {
  const { title, description, media, user_id } = postData;
  const sql = {
    text: `insert into posts (title, description, media, user_id) values ($1,$2,$3,$4) returning user_id;`,
    value: [title, description, media, user_id],
  };
  return connection.query(sql);
};
const deletePostQuery = (postId) => {
  const sql = {
    text: `delete * from posts where post_id = $1;`,
    value: [postId],
  };
  return connection.query(sql);
};

const getِUserPostsQuery = () => {};

const getAllPostsQuery = () => {};

module.exports = {
  addPostQuery,
  deletePostQuery,
  getِUserPostsQuery,
  getAllPostsQuery,
};
