import db from '../models';

const { Recipes } = db;

export default {

/** Add recipe
   * @param  {object} req - request
   * @param  {object} res - response
   */

  addRecipe(req, res) {
    return Recipes.create({
      recipeName: req.body.recipeName,
      ingredient: req.body.ingredient,
      details: req.body.details
    })
      .then(addRecipes => res.status(201).json({
        status: 'success',
        recipeName: addRecipes.recipeName,
        message: 'Recipe added successfully',
        data: { recipeId: addRecipes.id }
      }))
      .catch(error => res.status(400).json(error));
  },

  /** Modify recipe
   * @param  {object} req - request
   * @param  {object} res - response
   */

  modifyRecipe(req, res) {
    return Recipes
      .update(req.body,
        {
          where: {
            id: req.params.recipeId
          }
        })
      .then(() => {
        Recipes.findById(req.params.recipeId).then(result => res.status(205).json({
          status: 'success',
          message: 'Recipe modified successfully!',
          data:
          { recipeName: result.recipeName, ingredient: result.ingredient, details: result.details }
        }));
      })
      .catch(error => res.status(400).json(error));
  },

  /** Delete recipe
   * @param  {object} req - request
   * @param  {object} res - response
   */

  deleteRecipe(req, res) {
    return Recipes
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

  /** Get all recipes
   * @param  {object} req - request
   * @param  {object} res - response
   */

  getRecipes(req, res) {
    if (req.query.sort && req.query.order) {
      Recipes
        .findAll({
          order: [['votes', 'DESC']]
        })
        .then((display) => {
          res.status(201).json(display);
        });
    } else {
      return Recipes
        .findAll()
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
    }
  },


  /** Upvote a recipe
   * @param  {object} req - request
   * @param  {object} res - response
   */

  upvoteRecipe(req, res) {
    return Recipes
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
    return Recipes
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
  }
};
