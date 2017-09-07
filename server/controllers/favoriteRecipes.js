import db from '../models';

const { favoriteRecipes } = db;

export default {

  /** Add favorite recipe
   * @param  {object} req - request
   * @param  {object} res - response
   */

  favoriteRecipe(req, res) {
    favoriteRecipes
      .create({
        recipeId: req.body.recipeId,
        userId: req.params.userId,
      })
      .then(() => res.status(201).json({
        status: 'success',
        message: `You successfully choose recipe id ${req.body.recipeId} as your favorite recipes`
      }))
      .catch(error => res.status(400).json(error));
  },


  /** Get favorite recipes
   * @param  {object} req - request
   * @param  {object} res - response
   */

  getfavoriteRecipe(req, res) {
    favoriteRecipes
      .findAll({
        where: { userId: req.params.userId }
      })
      .then((favoriteRecipe) => {
        if (favoriteRecipe.length < 1) {
          res.status(404).json({
            message: 'No favorite recipe found'
          });
        } else {
          res.status(201).json(favoriteRecipe);
        }
      })
      .catch(error => res.status(404).json(error));
  }
};
