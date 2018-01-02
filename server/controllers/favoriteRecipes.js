import model from '../models';

const { favoriteRecipes } = model;

export default {

  /** Add favorite recipe
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   */

  favoriteRecipe(req, res) {
    const { userId } = req.decoded.currentUser;
    return favoriteRecipes
      .create({
        recipeId: req.params.recipeId,
        userId
      })
      .then(favorite => res.status(200).json({
        status: true,
        message: `You successfully choose recipe id ${req.params.recipeId} as your favorite recipes`,
        data: { recipeId: favorite.recipeId }
      }))
      .catch(() => res.status(500).json({
        error: 'Internal sever Error'
      }));
  },

  /** Get favorite recipes
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   */

  getfavoriteRecipe(req, res) {
    const { userId } = req.decoded.currentUser;
    const pageNumber = Number(req.query.page);
    const limit = 12;
    let offset;
    let page;
    const message = 'Sorry no recipe found for this page';
    if (pageNumber === 0) {
      offset = 0;
    } else {
      page = pageNumber;
      offset = limit * (page - 1);
    }
    favoriteRecipes
      .findAndCountAll({
        where: { userId },
        include: [{
          model: model.Recipes,
          attributes: ['recipeName',
            'ingredient', 'details',
            'upvotes', 'downvotes',
            'picture', 'views', 'createdAt'],
          include: [{
            model: model.Users,
            attributes: ['username']
          }]
        }],
        limit,
        offset,
      })
      .then((favoriteRecipes) => {
        const pages = Math.ceil(favoriteRecipes.count / limit);
        if (!favoriteRecipes.count) {
          res.status(404).json({
            message: 'No favorite recipe found'
          });
        } else if (pageNumber > pages) {
          return res.status(404).json({
            message: message
          });
        } else {
          return res.status(200).json({
            status: true,
            favoriteRecipes,
            pages
          });
        }
      })
      .catch(() => res.status(500).json({
        error: 'Internal sever Error'
      }));
  }
};
