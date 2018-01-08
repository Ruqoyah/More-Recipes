import models from '../models';
import { afterVote, validateQuery, capitalize } from '../helper';

const { Recipes } = models;

export default {

  /** Add recipe
   *
    * @param  {object} req - request
    *
    * @param  {object} res - response
    *
    */

  addRecipe(req, res) {
    const { userId } = req.decoded.currentUser;
    return Recipes.create({
      recipeName: capitalize(req.body.recipeName),
      ingredient: req.body.ingredient,
      details: req.body.details,
      picture: req.body.picture,
      userId
    })
      .then(addedRecipe => res.status(201).json({
        status: true,
        message: 'Recipe added successfully',
        data: addedRecipe
      }))
      .catch(() => res.status(500).json({
        error: 'Internal sever Error'
      }));
  },

  /** Modify recipe
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   */

  modifyRecipe(req, res) {
    Recipes
      .findById(req.params.recipeId)
      .then((currentRecipe) => {
        const { userId } = req.decoded.currentUser;
        if (currentRecipe.userId !== userId) {
          return res.status(403).json({
            message: 'sorry! you can only edit your own recipe'
          });
        }
        return Recipes
          .findOne({
            where: {
              id: req.params.recipeId
            }
          })
          .then(recipe => recipe
            .update({
              recipeName: req.body.recipeName || recipe.recipeName,
              ingredient: req.body.ingredient || recipe.ingredient,
              details: req.body.details || recipe.details,
              picture: req.body.picture || recipe.picture
            })
            .then(() => {
              Recipes.findById(req.params.recipeId)
                .then(result => res.status(200).json({ // eslint-disable-line
                  status: true,
                  message: 'Recipe modified successfully!',
                  data: result
                }));
            }));
      })
      .catch(() => res.status(500).json({
        error: 'Internal sever Error'
      }));
  },

  /** Delete recipe
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   * @return {object} returns an object
   *
   */
  deleteRecipe(req, res) {
    Recipes
      .findById(req.params.recipeId)
      .then((currentRecipe) => {
        const { userId } = req.decoded.currentUser;
        if (currentRecipe.userId !== userId) {
          return res.status(403).json({
            message: 'sorry! you can only delete your own recipe'
          });
        }
        return Recipes
          .destroy({
            where: {
              id: req.params.recipeId,
              userId: req.decoded.currentUser.userId
            }
          })
          .then((recipe) => {
            res.status(200).json({
              status: true,
              message: 'Recipe deleted successfully!',
              data: {
                id: Number(req.params.recipeId)
              }
            });
          });
      })
      .catch(() => res.status(500).json({
        error: 'Internal sever Error'
      }));
  },

  /** Upvote a recipe
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
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
          return res.status(404).json({
            message: 'no recipe found to be upvoted'
          });
        }
        if (req.message === 'created') {
          afterVote('upvote successful', req, res);
        } else if (req.message === 'updated') {
          afterVote('vote updated successfully', req, res);
        } else if (req.message === 'destroyed') {
          afterVote('vote removed successfully', req, res);
        }
      })
      .catch(() => res.status(500).json({
        error: 'Internal sever Error'
      }));
  },


  /** Downvote a recipe
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
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
          return res.status(404).json({
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
      })
      .catch(() => res.status(500).json({
        error: 'Internal sever Error'
      }));
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
            .then(() => res.status(200).json(recipe));
        });
      })
      .catch(() => res.status(500).json({
        error: 'Internal sever Error'
      }));
  },

  /** Get user recipes
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   * @return {object} returns an object
   *
   */
  getUserRecipes(req, res) {
    const { userId } = req.decoded.currentUser;
    const pageNumber = Number(req.query.page);
    const limit = 12;
    let offset;
    let page;
    const message = 'Sorry no recipe found for this page';
    if (pageNumber === 0) {
      offset = 0;
    } else {
      page = pageNumber;
      offset = limit * (page - 1);
    }
    Recipes
      .findAndCountAll({
        order: [['id', 'DESC']],
        where: {
          userId
        },
        limit,
        offset,
      })
      .then((recipes) => {
        const pages = Math.ceil(recipes.count / limit);
        if (!recipes.count) {
          return res.status(404).json({
            message: 'No recipe found'
          });
        } else if (pageNumber > pages) {
          return res.status(404).json({
            message: message
          });
        }
        return res.status(200).json({
          status: true,
          recipes,
          pages
        });
      })
      .catch(() => res.status(500).json({
        error: 'Internal sever Error'
      }));
  },

  /** Search Recipes
   * Get recipes with the most upvote
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   * @param  {object} next - next
   */

  searchRecipes(req, res, next) {
    if (!req.query.search) { return next(); }
    let results;
    Recipes
      .findAll({
        include: [{
          model: models.Users,
          attributes: ['username']
        }],
        where: {
          $or: [
            {
              recipeName: {
                $iLike: `%${req.query.search}%`
              }
            },
            {
              ingredient: {
                $iLike: `%${req.query.search}%`
              }
            }
          ]
        }
      })
      .then((foundRecipes) => {
        results = foundRecipes.slice(0);
        if (results.length < 1) {
          return res.status(404).json({
            message: 'No match Recipe found'
          });
        }
        return res.status(200).json({
          status: true,
          data: results
        });
      })
      .catch(() => res.status(500).json({
        error: 'Internal sever Error'
      }));
  },

  /** Get recipes with the most upvote
   * @param  {object} req - request
   * @param  {object} res - response
   * @param  {object} next - next
   */

  sortRecipes(req, res, next) {
    if (!req.query.sort) { return next(); }
    const validSort = ['upvotes', 'downvotes'];
    if (validateQuery(req.query.sort, validSort)) {
      return Recipes
        .findAll({
          order: [[req.query.sort, 'DESC']],
          limit: 5
        })
        .then((recipes) => {
          res.status(200).json({
            status: true,
            recipes
          });
        })
        .catch(() => res.status(500).json({
          error: 'Internal sever Error'
        }));
    }
    return res.status(403).json({
      status: false,
      message: 'Invalid Request'
    });
  },

  /** Get all recipes
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   * @return {object} returns an object
   */
  getAllRecipes(req, res) {
    const pageNumber = Number(req.query.page);
    const limit = 12;
    let offset;
    let page;
    const message = 'Sorry no recipe found for this page';
    if (pageNumber === 0) {
      offset = 0;
    } else {
      page = pageNumber;
      offset = limit * (page - 1);
    }
    Recipes
      .findAndCountAll({
        order: [['id', 'DESC']],
        include: [{
          model: models.Users,
          attributes: ['username']
        }],
        limit,
        offset,
      })
      .then((recipes) => {
        const pages = Math.ceil(recipes.count / limit);
        if (!recipes.count) {
          return res.status(404).json({
            message: 'No recipe found'
          });
        } else if (pageNumber > pages) {
          return res.status(404).json({
            message: message
          });
        }
        return res.status(200).json({
          status: true,
          recipes,
          pages
        });
      })
      .catch(() => res.status(500).json({
        error: 'Internal sever Error'
      }));
  },
};

