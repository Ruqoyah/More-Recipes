import model from '../models';

const Recipes = model.Recipes;

export default {
  // add a recipe
  addRecipe(req, res) {
    if (!req.body.recipeName) {
      res.status(400).send({ message: 'Enter recipe name' });
    } else if (!req.body.ingredient) {
      res.status(400).send({ message: 'Input ingredient' });
    } else if (!req.body.details) {
      res.status(400).send({ message: 'Input details' });
    } else {
      Recipes
        .findOne({
          where: {
            recipeName: req.body.recipeName,
            ingredient: req.body.ingredient,
            details: req.body.details
          },
        })
        .then(() => {
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
        });
    }
  },

  // modify recipe
  modifyRecipe(req, res) {
    Recipes
      .findOne({
        where: {
          id: req.params.recipeId
        }
      })
      .then((recipe) => {
        if (!recipe) {
          res.status(404).send({
            message: 'Recipe id does not exist'
          });
        } else if (!req.body.recipeName) {
          res.status(400).send({ message: 'Recipe name can\'t be empty' });
        } else if (!req.body.ingredient) {
          res.status(400).send({ message: 'Ingredient can\'t be empty' });
        } else if (!req.body.details) {
          res.status(400).send({ message: 'Details can\'t be empty' });
        } else {
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
        }
      });
  },

  // delete recipe
  deleteRecipe(req, res) {
    Recipes
      .findOne({
        where: {
          id: req.params.recipeId
        }
      })
      .then((recipe) => {
        if (!recipe) {
          res.status(404).send({
            message: 'Recipe Id does not exist'
          });
        } else {
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
        }
      });
  },

  // get all users
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
