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
      details: req.body.details,
      userId: req.body.userId
    })
      .then(addRecipe => res.status(201).json({
        status: 'success',
        recipeName: addRecipe.recipeName,
        message: 'Recipe added successfully',
        data: { recipeId: addRecipe.id, userId: addRecipe.userId }
      }))
      .catch(error => res.status(400).json(error));
  },

  /** Modify recipe
   * @param  {object} req - request
   * @param  {object} res - response
   */

  modifyRecipe(req, res) {
    Recipes.findById(req.params.recipeId)
      .then((currentRecipe) => {
        const userId = req.body.userId;
        if (+currentRecipe.userId !== +userId) {
          return res.status(403).json({
            status: 'fail',
            message: 'You cannot modify this recipe'
          });
        }
        return Recipes
          .findOne({ where: {
            id: req.params.recipeId }
          })
          .then(recipe => recipe
            .update({
              recipeName: req.body.recipeName || recipe.recipeName,
              ingredient: req.body.ingredient || recipe.ingredient,
              details: req.body.details || recipe.details
            })
            .then(() => {
              Recipes.findById(req.params.recipeId).then(result => res.status(200).json({
                status: 'success',
                message: 'Recipe modified successfully!',
                data: {
                  recipeName: result.recipeName,
                  ingredient: result.ingredient,
                  details: result.details,
                  userId: result.userId }
              }));
            }));
      })
      .catch(error => res.status(400).json(error));
  },

  /** Delete recipe
   * @param  {object} req - request
   * @param  {object} res - response
   */

  deleteRecipe(req, res) {
    Recipes.findById(req.params.recipeId)
      .then((currentRecipe) => {
        const userId = req.body.userId;
        if (+currentRecipe.userId !== +userId) {
          return res.status(403).json({
            status: 'fail',
            message: 'You cannot delete this recipe'
          });
        }
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
          });
      })
      .catch(error => res.status(404).json(error));
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
      .then(() => {
        db.Votes.findById(req.params.recipeId).then(upvote => res.status(200).json({
          status: 'success',
          message: 'Upvote added successfully!',
          data: { userId: upvote.userId, recipeId: upvote.recipeId }
        }));
      })
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
      .then(() => {
        db.Votes.findById(req.params.recipeId).then(downvote => res.status(200).json({
          status: 'success',
          message: 'Downvote added successfully!',
          data: { userId: downvote.userId, recipeId: downvote.recipeId }
        }));
      })
      .catch(error => res.status(400).json(error));
  },

  /** View recipe
   * @param  {object} req - request
   * @param  {object} res - response
   */

  viewRecipe(req, res) {
    return Recipes
      .findOne({
        where: {
          id: req.params.recipeId
        }
      })
      .then((recipe) => {
        recipe.increment('views').then(() => {
          recipe.reload()
            .then(() => res.status(200).send(recipe));
        });
      })
      .catch(error => res.status(400).send(error));
  },

};

