import db from '../models';

const { favoriteRecipes } = db;

export default {
  // add favorite recipes
  favoriteRecipe(req, res) {
    favoriteRecipes
      .create({
        recipeId: req.body.recipeId,
        userId: req.params.userId,
      })
      .then(() => res.status(201).send({
        message: `You successfully choose recipe id ${req.body.recipeId} as your favorite recipes`
      }))
      .catch(error => res.status(400).send(error));
  },


  // get favorite recipes
  getfavoriteRecipe(req, res) {
    favoriteRecipes
      .findAll({
        where: { userId: req.params.userId }
      })
      .then((favoriteRecipe) => {
        if (favoriteRecipe.length < 1) {
          res.status(404).send({
            message: 'No favorite recipe found'
          });
        } else {
          res.status(201).send(favoriteRecipe);
        }
      })
      .catch(error => res.status(404).send(error));
  }
};
