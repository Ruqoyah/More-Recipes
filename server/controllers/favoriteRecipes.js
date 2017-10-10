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
        userId: req.body.userId,
        category: req.body.category
      })
      .then(favorite => res.status(200).json({
        status: true,
        message: `You successfully choose recipe id ${req.params.recipeId} as your favorite recipes`,
        data: { userId: favorite.userId, recipeId: favorite.recipeId }
      }))
      .catch(error => res.status(400).json(error));
  },

  recipeCategory(req, res) {
    return favoriteRecipes
      .findOne({ where:
        { userId: req.body.userId, recipeId: req.params.recipeId }
      })
      .then((recipe) => {
        if (req.body.category === 'undefined') {
          return res.status(200).send({
            status: 'success',
            message: `Recipe added to ${recipe.category} category`
          });
        }
        recipe
          .update({ category: req.body.category || recipe.category })
          .then(() => {
            res.status(200).send({
              status: 'success',
              message: `Recipe added to ${recipe.category} category`
            });
          });
      })
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
          attributes: ['recipeName', 'ingredient', 'details', 'votes', 'picture', 'views'],
          include: [{
            model: db.Users,
            attributes: ['fullName', 'updatedAt']
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
      .catch(error => res.status(404).json(error));
  }
};
