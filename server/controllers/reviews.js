import models from '../models';
import { reviewNotification } from '../helper';

const { Reviews } = models;

export default {

  /** Post review
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   */

  postReview(req, res) {
    const { userId } = req.decoded.currentUser;
    return Reviews
      .create({
        recipeId: req.params.recipeId,
        review: req.body.review,
        userId
      })
      .then((createReview) => {
        createReview.reload({
          include: [{
            model: models.Users,
            attributes: ['picture', 'username']
          }]
        })
          .then((review) => {
            res.status(200).json({
              status: true,
              data: review
            });
          });
      })
      .then(() => {
        reviewNotification(req);
      })
      .catch(() => res.status(500).json({
        error: 'Internal sever Error'
      }));
  },

  /** Get reviews
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   */

  getReviews(req, res) {
    const pageNumber = Number(req.query.page);
    const limit = 5;
    let offset;
    let page;
    if (pageNumber === 0) {
      offset = 0;
    } else {
      page = pageNumber;
      offset = limit * (page - 1);
    }
    Reviews
      .findAndCountAll({
        where: {
          recipeId: req.params.recipeId
        },
        order: [['createdAt', 'DESC']],
        include: [{
          model: models.Users,
          attributes: ['picture', 'username']
        }],
        limit,
        offset,
      })
      .then((reviews) => {
        const pages = Math.ceil(reviews.count / limit);
        return res.status(200).json({
          status: true,
          reviews,
          pages
        });
      })
      .catch(() => res.status(500).json({
        error: 'Internal sever Error'
      }));
  }
};
