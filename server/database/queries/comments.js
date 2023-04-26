const { connection } = require("../config");

const getAllCommentsQuery = (postId) => {
  const sql = {
    text: `SELECT c.id, c.content,c.user_id,
    c.post_id, u.username, p.title
    FROM comments c join posts p on p.id = c.post_id JOIN users u on u.id = c.user_id
    WHERE c.post_id = $1;`,
    values: [postId],
  };
  return connection.query(sql);
};

const addCommentQuery = (content, userId, postId) => {
  const sql = {
    text: `INSERT INTO comments (content, user_id ,post_id)
    VALUES ($1, $2, $3) RETURNING comments.id, comments.content, comments.user_id, comments.post_id,(SELECT username FROM users WHERE users.id = comments.user_id) AS username;`,
    values: [content, userId, postId],
  };
  return connection.query(sql);
};

const deleteCommentQuery = (id) => {
  const sql = {
    text: "DELETE FROM comments WHERE comments.id=$1;",
    values: [id],
  };
  return connection.query(sql);
};

module.exports = { getAllCommentsQuery, addCommentQuery, deleteCommentQuery };
