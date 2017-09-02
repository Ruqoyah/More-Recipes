import model from '../models';

const Reviews = model.Reviews;

export default {
  // post review
  postReview(req, res) {
    Reviews
      .findOne({
        where: {
          recipeId: req.params.recipeId
        }
      })
      .then((recipe) => {
        if (!recipe) {
          res.status(404).send({
            message: 'Recipe Id does not exist'
          });
        } else {
          Reviews
            .create({
              review: req.body.review,
              userId: req.body.userId
            })
            .then(review => res.status(201).send({
              review: (review.review)
            }))
            .catch(error => res.status(400).send(error));
        }
      });
  },


  // retrieve
  getReviews(req, res) {
    Reviews
      .findAll({
        where: { recipeId: req.params.recipeId }
      })
      .then((review) => {
        if (review) {
          res.send(review);
        } else {
          res.status(400).send('review not found');
        }
      });
  }
};
