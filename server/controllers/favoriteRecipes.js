import db from '../models';

const { favoriteRecipes } = db;

export default {

  /** Add favorite recipe
   * @param  {object} req - request
   * @param  {object} res - response
   */

  favoriteRecipe(req, res) {
    return favoriteRecipes
      .create({
        recipeId: req.params.recipeId,
        userId: req.body.userId
      })
      .then(favorite => res.status(200).json({
        status: true,
        message: `You successfully choose recipe id ${req.params.recipeId} as your favorite recipes`,
        data: { userId: favorite.userId, recipeId: favorite.recipeId }
      }))
      .catch(error => res.status(400).json(error));
  },

  /** Get favorite recipes
   * @param  {object} req - request
   * @param  {object} res - response
   */

  getfavoriteRecipe(req, res) {
    return favoriteRecipes
      .findAll({
        where: { userId: req.params.userId },
        include: [{
          model: db.Recipes,
          attributes: ['recipeName',
            'ingredient', 'details',
            'upvotes', 'downvotes',
            'picture', 'views', 'creator', 'updatedAt'],
          include: [{
            model: db.Users,
            attributes: ['username']
          }]
        }],
      })
      .then((favoriteRecipe) => {
        if (favoriteRecipe.length < 1) {
          res.status(404).json({
            message: 'No favorite recipe found'
          });
        } else {
          res.status(200).json(favoriteRecipe);
        }
      })
      .catch(error => res.status(400).json(error));
  }
};
