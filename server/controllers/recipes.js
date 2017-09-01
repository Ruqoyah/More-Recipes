import model from '../models';

const Recipes = model.Recipes;

export default {
  // add a recipe
  addRecipes(req, res) {
    if (!req.body.recipeName) {
      res.status(400).send({ message: 'Enter recipe name' });
    }
    if (!req.body.ingredient) {
      res.status(400).send({ message: 'Input ingredient' });
    }
    if (!req.body.details) {
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
            .then(createGroup => res.status(201).send({
              success: true,
              recipeName: createGroup.recipeName,
              message: 'Recipe added successfully'
            }))
            .catch(error => res.status(400).send(error));
        });
    }
  },

  // get all users
  getRecipes(req, res) {
    Recipes
      .findAll({})
      .then((recipes) => {
        if (recipes) {
          res.json(recipes);
        } else {
          res.status(404).send('No Recipe found');
        }
      });
  }
};
