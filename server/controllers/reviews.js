import db from '../models';

const { Reviews } = db;

export default {

  /** Post review
   * @param  {object} req - request
   * @param  {object} res - response
   */

  postReview(req, res) {
    return Reviews
      .create({
        recipeId: req.params.recipeId,
        review: req.body.review,
        userId: req.body.userId
      })
      .then(review => res.status(200).json({
        status: 'success',
        review: (review.review),
        data: { userId: review.userId, recipeId: review.recipeId }
      }))
      .catch(error => res.status(400).json(error));
  },

  /** Get reviews
   * @param  {object} req - request
   * @param  {object} res - response
   */

  getReviews(req, res) {
    return Reviews
      .findAll({
        where: { recipeId: req.params.recipeId }
      })
      .then((reviews) => {
        if (reviews.length < 1) {
          res.status(404).json({
            message: 'No review found'
          });
        } else {
          res.status(200).json(reviews);
        }
      })
      .catch(error => res.status(404).json(error));
  }
};
