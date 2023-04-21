const { connection } = require("../config");

const checkVoteQuery = (userId, postId) => {
  const sql = {
    text: `SELECT FROM votes WHERE user_id = $1 AND post_id = $2;`,
    values: [userId, postId],
  };
  return connection.query(sql);
};

const voteQuery = (postId, userId, vote) => {
  const sql = {
    text: "INSERT INTO votes (post_id, user_id,vote) values ($1, $2 ,$3) ON CONFLICT (post_id, user_id) DO UPDATE SET vote = $3 RETURNING *;",
    values: [postId, userId, vote],
  };
  return connection.query(sql);
};

module.exports = { checkVoteQuery, voteQuery };
