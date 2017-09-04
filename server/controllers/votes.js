import db from '../models';

const { Votes } = db;

export default {
  // upvote recipe
  upVote(req, res) {
    Votes
      .findOne({
        where: {
          userId: req.params.userId,
        }
      })
      .then((user) => {
        if (user) {
          return res.status(400).send({
            message: 'You already upvoted'
          });
        }
        Votes
          .create({
            recipeId: req.body.recipeId,
            userId: req.params.userId,
            vote: true
          })
          .then(() => res.status(201).send({
            message: `You successfully upvote for recipe id ${req.body.recipeId}`
          }))
          .catch(error => res.status(400).send(error));
      });
  },

  // downvote recipe
  downVote(req, res) {
    Votes
      .findOne({
        where: {
          userId: req.params.userId,
          recipeId: req.body.recipeId
        }
      })
      .then((user) => {
        if (user.vote === true) {
          Votes.update({ vote: false }, {
            where: {
              userId: req.params.userId,
            }
          });
        }
        Votes
          .create({
            recipeId: req.body.recipeId,
            userId: req.params.userId,
            vote: false
          })
          .then(() => res.status(201).send({
            message: `You successfully downvote for recipe id ${req.body.recipeId}`
          }))
          .catch(error => res.status(400).send(error));
      });
  }
};
