import db from '../models';

const { Recipes } = db;

export default {

  /** Get all recipes
   * Search Recipes
   * Get recipes with the most upvote
   * @param  {object} req - request
   * @param  {object} res - response
   */

  getAllRecipes(req, res) {
    if (req.query.sort && req.query.order) {
      Recipes
        .findAll({
          include: [{
            model: db.Reviews,
            attributes: ['review'],
            include: [{
              model: db.Users,
              attributes: ['fullName', 'updatedAt']
            }]
          }],
          order: [['upvotes', 'DESC']],
          limit: 5
        })
        .then((display) => {
          res.status(200).json(display);
        });
    } else if (req.query.search) {
      let results;
      Recipes
        .findAll({
          where: {
            $or: [
              { recipeName: {
                $iLike: `%${req.query.search}%` }
              },
              { ingredient: {
                $iLike: `%${req.query.search}%` }
              }
            ]
          },
          include: [{
            model: db.Reviews,
            attributes: ['review'],
            include: [{
              model: db.Users,
              attributes: ['fullName', 'updatedAt']
            }]
          }]
        })
        .then((foundRecipes) => {
          results = foundRecipes.slice(0);
        })
        .then(() => {
          db.Users
            .findAll({
              attributes: ['fullName'],
              where: {
                $or: [
                  { fullName: {
                    $iLike: `%${req.query.search}%` }
                  },
                  { username: {
                    $iLike: `%${req.query.search}%` }
                  },
                ]
              },
              include: [{
                model: db.Recipes,
                include: [{
                  model: db.Reviews,
                  attributes: ['review'],
                  include: [{
                    model: db.Users,
                    attributes: ['fullName', 'updatedAt']
                  }]
                }]
              }]
            })
            .then((recipe) => {
              if (results.concat(recipe).length < 1) {
                return res.status(200).json({
                  message: 'No match Recipe found',
                  data: []

                });
              }
              return res.status(200).json({
                data: results.concat(recipe) });
            });
        });
    } else {
      Recipes
        .findAll({
          include: [{
            model: db.Reviews,
            attributes: ['review'],
            include: [{
              model: db.Users,
              attributes: ['fullName', 'updatedAt']
            }]
          }]
        })
        .then((recipes) => {
          if (recipes.length < 1) {
            return res.status(404).json({
              message: 'No Recipe found'
            });
          }
          return res.status(200).json(recipes);
        })
        .catch(error => res.status(400).json(error));
    }
  }
};
