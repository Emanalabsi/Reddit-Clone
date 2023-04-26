const {
  voteQuery,
  checkVoteQuery,
  countVotesQuery,
} = require("../database/queries/votes");
const { CustomError } = require("../utils");

const vote = (req, res, next) => {
  const { postId, vote } = req.params;
  const { id } = req.user;
  checkVoteQuery(id, postId)
    .then((data) => {
      if (data.rows.length && data.rows[0].vote === parseInt(vote, 10)) {
        throw new CustomError("You have already voted", 400);
      }
    })
    .then(() => {
      return voteQuery(postId, id, vote);
    })
    .then((data) =>
      res.json({
        error: false,
        data: data.rows,
      })
    )
    .catch((err) => next(err));
};

const countVotes = (req, res, next) => {
  const { postId } = req.params;
  countVotesQuery(postId)
    .then((data) => {
      const voteCount = data.rows[0].upvotes - data.rows[0].downvotes;
      res.json({
        error: false,
        data: { voteCount, ...data.rows },
      });
    })
    .catch((err) => next(err));
};

module.exports = { vote, countVotes };
