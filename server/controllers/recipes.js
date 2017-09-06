import db from '../models';

const { Recipes } = db;

export default {

  // add a recipe
  addRecipe(req, res) {
    Recipes.create({
      recipeName: req.body.recipeName,
      ingredient: req.body.ingredient,
      details: req.body.details
    })
      .then(addRecipes => res.status(201).json({
        status: 'success',
        recipeName: addRecipes.recipeName,
        message: 'Recipe added successfully',
        recipeId: addRecipes.id
      }))
      .catch(error => res.status(400).json(error));
  },

  // modify recipe
  modifyRecipe(req, res) {
    Recipes
      .update(req.body,
        {
          where: {
            id: req.params.recipeId
          }
        })
      .then(() => res.status(205).json({
        status: 'success',
        message: 'Recipe modified successfully!'
      }))
      .catch(error => res.status(400).json(error));
  },

  // delete recipe
  deleteRecipe(req, res) {
    Recipes
      .destroy({
        where: {
          id: req.params.recipeId
        }
      })
      .then(() => {
        res.status(200).json({
          status: 'success',
          message: 'Recipe deleted successfully!'
        });
      })
      .catch(error => res.status(404).json(error));
  },

  // get recipes
  getRecipes(req, res) {
    Recipes
      .findAll({})
      .then((recipes) => {
        if (recipes.length < 1) {
          res.status(404).send({
            message: 'No Recipe found'
          });
        } else {
          res.status(201).json(recipes);
        }
      })
      .catch(error => res.status(404).json(error));
  },

  /** Upvote a recipe
   * @param  {object} req - request
   * @param  {object} res - response
   */

  upvoteRecipe(req, res) {
    Recipes
      .findOne({
        where: {
          id: req.params.recipeId
        }
      })
      .then((recipe) => {
        Recipes
          .update({
            votes: recipe.votes + 1
          },
          {
            where: {
              id: req.params.recipeId
            }
          });
      })
      .then(() => res.status(200).json({
        status: 'success',
        message: 'Upvote added successfully!'
      }))
      .catch(error => res.status(400).json(error));
  },

  /** Downvote a recipe
   * @param  {object} req - request
   * @param  {object} res - response
   */

  downvoteRecipe(req, res) {
    Recipes
      .findOne({
        where: {
          id: req.params.recipeId
        }
      })
      .then((recipe) => {
        Recipes
          .update({
            votes: recipe.votes - 1
          }, {
            where: {
              id: req.params.recipeId
            }
          });
      })
      .then(() => res.status(200).json({
        status: 'success',
        message: 'Downvote added successfully!'
      }))
      .catch(error => res.status(400).json(error));
  },

  // get recipes with the most upvote
  getUpvoteRecipes(req, res) {
    Recipes
      .findAll({
        order: [['votes', 'DESC']]
      })
      .then((display) => {
        res.json(display);
      });
  }
};
