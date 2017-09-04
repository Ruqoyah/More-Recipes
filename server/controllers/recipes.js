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
      .then(addRecipes => res.status(201).send({
        success: true,
        recipeName: addRecipes.recipeName,
        message: 'Recipe added successfully',
        recipeId: addRecipes.id
      }))
      .catch(error => res.status(400).send(error));
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
      .then(() => res.status(200).send({
        message: 'Recipe modified successfully!'
      }))
      .catch(error => res.status(400).send(error));
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
        res.status(200).send({
          message: 'Recipe deleted successfully!'
        });
      })
      .catch(error => res.status(404).send(error));
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
          res.status(201).send(recipes);
        }
      })
      .catch(error => res.status(404).send(error));
  }
};