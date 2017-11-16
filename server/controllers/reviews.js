import db from '../models';
import { reviewNotification } from '../middleware/validation';

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
      .then((review) => {
        res.status(200).json({
          status: true,
          data: review
        });
      })
      .then(() => {
        reviewNotification(req);
      })
      .catch(error => res.status(500).json(error));
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
        res.status(200).json(reviews);
      })
      .catch(error => res.status(500).json(error));
  }
};
