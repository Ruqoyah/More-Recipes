import db from '../models';

const { Recipes } = db;

const getRecipeVoteCount = (req) => { // eslint-disable-line
  return db.Votes
    .findAndCountAll({
      where: {
        upvote: 1, recipeId: req.params.recipeId,
      },
    })
    .then((upvoteCount) => { // eslint-disable-line
      return db.Votes
        .findAndCountAll({
          where: {
            downvote: 1, recipeId: req.params.recipeId,
          },
        }).then((downvoteCount) => { // eslint-disable-line
          return Recipes.findById(req.params.recipeId)
            .then((recipe) => { // eslint-disable-line
              return recipe.update({ upvotes: upvoteCount.count, downvotes: downvoteCount.count }, { fields: ['upvotes', 'downvotes'] });
            });
        });
    });
};
const afterVote = (msg, req, res, vote) => {
  getRecipeVoteCount(req, vote).then(() => {
    Recipes.findById(req.params.recipeId).then(result => res.status(200).json({
      message: msg,
      data: result
    }));
  });
};


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
      picture: req.body.picture,
      userId: req.body.userId
    })
      .then(addRecipe => res.status(201).json({
        status: 'success',
        message: 'Recipe added successfully',
        data: {
          recipeId: addRecipe.id,
          userId: addRecipe.userId,
          recipeName: addRecipe.recipeName,
          ingredient: addRecipe.ingredient,
          details: addRecipe.details,
          picture: addRecipe.picture
        }
      }))
      .catch(error => res.status(400).json(error));
  },

  /** Modify recipe
   * @param  {object} req - request
   * @param  {object} res - response
   */

  modifyRecipe(req, res) {
    return Recipes
      .findOne({ where: {
        id: req.params.recipeId }
      })
      .then(recipe => recipe
        .update({
          recipeName: req.body.recipeName || recipe.recipeName,
          ingredient: req.body.ingredient || recipe.ingredient,
          details: req.body.details || recipe.details,
          picture: req.body.picture || recipe.picture
        })
        .then(() => {
          Recipes.findById(req.params.recipeId).then(result => res.status(200).json({
            status: 'success',
            message: 'Recipe modified successfully!',
            data: {
              recipeName: result.recipeName,
              ingredient: result.ingredient,
              details: result.details,
              picture: result.picture,
              userId: result.userId }
          }));
        }))
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
          message: 'Recipe deleted successfully!',
          id: req.params.recipeId
        });
      })
      .catch(error => res.status(404).json(error));
  },

  /** Upvote a recipe
   * @param  {object} req - request
   * @param  {object} res - response
   */

  upVoteRecipe(req, res) {
    Recipes
      .findOne({
        where: {
          id: req.params.recipeId
        }
      })
      .then((vote) => {
        if (vote.length < 1) {
          return res.status(404).send({
            message: 'no recipe found to be upvoted'
          });
        }
        if (req.message === 'created') {
          afterVote('upvote successful', req, res);
        } else if (req.message === 'updated') {
          afterVote('vote updated successfully', req, res);
        } else if (req.message === 'destroyed') {
          afterVote('vote remove successfully', req, res);
        }
      });
  },


  /** Downvote a recipe
   * @param  {object} req - request
   * @param  {object} res - response
   */

  downVoteRecipe(req, res) {
    return Recipes
      .findOne({
        where: {
          id: req.params.recipeId
        }
      })
      .then((vote) => {
        if (vote.length < 1) {
          return res.status(404).send({
            message: 'no recipe found to be downvoted'
          });
        }
        if (req.message === 'created') {
          afterVote('downvote successful', req, res);
        } else if (req.message === 'updated') {
          afterVote('vote updated successfully', req, res);
        } else if (req.message === 'destroyed') {
          afterVote('vote removed successfully', req, res);
        }
      });
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
        },
        include: [{
          model: db.Reviews,
          attributes: ['review'],
          include: [{
            model: db.Users,
            attributes: ['fullName', 'updatedAt'],
          }]
        }],
      })
      .then((recipe) => {
        recipe.increment('views').then(() => {
          recipe.reload()
            .then(() => res.status(200).send(recipe));
        });
      })
      .catch(error => res.status(400).send(error));
  },

  getUserRecipes(req, res) {
    Recipes
      .findAll({
        where: {
          userId: req.params.userId
        },
        include: [{
          model: db.Reviews,
          attributes: ['review'],
          include: [{
            model: db.Users,
            attributes: ['fullName', 'updatedAt'],
          }]
        }],
      })
      .then((recipes) => {
        if (recipes.length < 1) {
          return res.status(404).json({
            message: 'No Recipe found'
          });
        }
        return res.status(200).json(recipes);
      })
      .catch(error => res.status(404).json(error));
  },

  // getRecipeUpVoteCount(req, res) {
  //   return db.Votes
  //     .findAndCountAll({
  //       where: {
  //         upvote: 1, recipeId: req.params.recipeId
  //       },
  //     })
  //     .then((result) => {
  //       const upvote = { id: Number(req.params.recipeId), upvote: result.count };
  //       res.status(200).json(upvote);
  //     });
  // },


};

