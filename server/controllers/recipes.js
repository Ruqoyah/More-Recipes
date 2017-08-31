import model from '../models';

const Recipes = model.Recipes;

export default {
  // add recipes
  addRecipes(req, res) {
    if (!req.body.recipe_name) {
      res.status(400).send({ message: 'Input Recipe name' });
    } else {
      Recipes
        .findOne({
          where: {
            recipe_name: req.body.recipe_name
          },
        });
      if (!req.body.ingredient) {
        res.status(400).send({ message: 'Input Ingredient' });
      } else {
        Recipes
          .findOne({
            where: {
              ingredient: req.body.ingredient
            },
          });
        if (!req.body.details) {
          res.status(400).send({ message: 'Input details' });
        } else {
          Recipes
            .findOne({
              where: {
                details: req.body.details
              },
            });
          Recipes
            .create({
              recipe_name: req.body.recipe_name,
              ingredient: req.body.ingredient,
              details: req.body.details
            })
            .then(addRecipes => res.status(201).send({
              success: true,
              recipe_name: addRecipes.recipe_name,
              message: 'Recipe added successfully'
            }))
            .catch(error => res.status(400).send(error));
        }
      }
    }
  }
};
