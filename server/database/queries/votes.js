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
    text: `INSERT INTO votes (post_id, user_id,vote) values ($1, $2 ,$3) ON CONFLICT (post_id, user_id) DO UPDATE SET vote = $3 RETURNING *;`,
    values: [postId, userId, vote],
  };
  return connection.query(sql);
};

const countVotesQuery = (postId) => {
  const sql = {
    text: `SELECT COUNT(DISTINCT CASE WHEN votes.vote = 1 AND votes.post_id = 1 THEN votes.user_id END) AS upvotes,
    COUNT(DISTINCT CASE WHEN votes.vote = -1 AND votes.post_id = 1 THEN votes.user_id END) AS downvotes
    FROM votes 
    WHERE votes.post_id = $1;`,
    values: [postId],
  };
  return connection.query(sql);
};

module.exports = { checkVoteQuery, voteQuery, countVotesQuery };
