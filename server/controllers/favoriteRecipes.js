import model from '../models';

const favoriteRecipes = model.favoriteRecipes;

export default {
  // add favorite recipes
  favoriteRecipe(req, res) {
    favoriteRecipes
      .findOne({
        where: {
          id: req.params.userId
        }
      })
      .then((user) => {
        if (!user) {
          res.status(404).send({
            message: 'user Id does not exist'
          });
        } else {
          favoriteRecipes
            .create({
              recipeId: req.body.recipeId,
            })
            .then(() => res.status(201).send({
              message: 'Recipe modified successfully!'
            }))
            .catch(error => res.status(400).send(error));
        }
      });
  },


  // get favorite recipes
  getfavoriteRecipe(req, res) {
    favoriteRecipes
      .findAll({
        where: { userId: req.params.userId }
      })
      .then((favoriteRecipe) => {
        if (favoriteRecipe) {
          res.send(favoriteRecipe);
        } else {
          res.status(400).send('No favorite recipe found');
        }
      });
  }
};
