const { connection } = require("../config");

const getAllPostsQuery = () => {
  const sql = {
    text: `SELECT 
    posts.id AS post_id, 
    posts.title AS post_title, 
    posts.description AS post_description,
    posts.media AS post_media,
    json_agg(json_build_object('comment_id', comments.id, 'comment_content', comments.content, 'vote_value', votes.vote, 'username', users.username, 'commenter_name', comment_users.username)) AS comments 
    FROM posts 
    JOIN users ON posts.user_id = users.id 
    LEFT JOIN comments ON posts.id = comments.post_id 
    LEFT JOIN users AS comment_users ON comments.user_id = comment_users.id
    LEFT JOIN votes ON posts.id = votes.post_id
    GROUP BY posts.id, posts.title, posts.description, posts.media 
    ORDER BY posts.id;
    `,
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
  getAllPostsQuery,
  getPostByIdQuery,
  updatePostQuery,
};
