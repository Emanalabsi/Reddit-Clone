const { connection } = require("../config");

const getAllPostsQuery = () => {
  const sql = {
    text: `SELECT p.id, p.title, p.description, p.media, u.username FROM posts p INNER JOIN users u on u.id = p.user_id;`,
  };
  return connection.query(sql);
};

const addPostQuery = (postData, id) => {
  const { title, description, media } = postData;
  const sql = {
    text: `INSERT INTO posts (title, description, media, user_id) values ($1,$2,$3,$4) RETURNING *;`,
    values: [title, description, media, id],
  };
  return connection.query(sql);
};

const deletePostQuery = (postId) => {
  const sql = {
    text: `DELETE FROM posts WHERE id = $1;`,
    values: [postId],
  };
  return connection.query(sql);
};

const getِUserPostsQuery = (userId) => {
  const sql = {
    text: `SELECT p.title, p.description, p.media, u.username FROM posts p INNER JOIN users u on u.id = p.user_id WHERE u.id = $1;`,
    values: [userId],
  };
  return connection.query(sql);
};

const getPostByIdQuery = (postId) => {
  const sql = {
    text: `SELECT * FROM posts WHERE id = $1;`,
    values: [postId],
  };
  return connection.query(sql);
};

const updatePostQuery = (title, description, postId) => {
  const sql = {
    text: `UPDATE posts SET title = $1, description = $2 WHERE id = $3;`,
    values: [title, description, postId],
  };
  return connection.query(sql);
};

module.exports = {
  addPostQuery,
  deletePostQuery,
  getِUserPostsQuery,
  getAllPostsQuery,
  getPostByIdQuery,
  updatePostQuery,
};
