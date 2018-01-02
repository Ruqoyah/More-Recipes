import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import model from '../models/';
import { capitalize } from '../helper/index';

dotenv.load();

const { Recipes, Users, favoriteRecipes, Votes } = model;

/** Check if recipe field is empty
 *
 * @param  {object} req - request
 *
 * @param  {object} res - response
 *
 * @param  {object} next - next
 *
 */

export const checkRecipeInput = (req, res, next) => {
  if (!req.body.recipeName) {
    return res.status(400).json({
      status: false,
      message: 'Enter recipe name'
    });
  }
  if (!req.body.ingredient) {
    return res.status(400).json({
      status: false,
      message: 'Input ingredient'
    });
  }
  if (!req.body.details) {
    return res.status(400).json({
      status: false,
      message: 'Input details'
    });
  }
  if (!req.body.picture) {
    return res.status(400).json({
      status: false,
      message: 'You need to upload a picture'
    });
  }
  next();
};

/** Check if signup field is empty
 *
 * @param  {object} req - request
 *
 * @param  {object} res - response
 *
 * @param  {object} next - next
 *
 */

export const checkUserInput = (req, res, next) => {
  if (!req.body.username) {
    return res.status(400).json({
      status: false,
      message: 'Username is required'
    });
  }
  if (!req.body.fullName) {
    return res.status(400).json({
      status: false,
      message: 'fullName is required'
    });
  }
  if (!req.body.email) {
    return res.status(400).json({
      status: false,
      message: 'Email is required'
    });
  }
  if (!req.body.password) {
    return res.status(400).json({
      status: false,
      message: 'Password is required'
    });
  }
  next();
};


/** Check if user signup with a valid username, email and password
 *
 * @param  {object} req - request
 *
 * @param  {object} res - response
 *
 * @param  {object} next - next
 *
 */

export const checkValidUserInput = (req, res, next) => {
  req.checkBody(
    {
      username: {
        notEmpty: true,
        isLength: {
          options: [{ min: 5 }],
          errorMessage: 'Please provide a username with atleast 5 characters.'
        }
      },
      email: {
        notEmpty: true,
        isEmail: {
          errorMessage: 'Provide a valid a Email Adrress'
        }
      },
      password: {
        notEmpty: true,
        isLength: {
          options: [{ min: 8 }],
          errorMessage: 'Provide a valid password with minimum of 8 characters'
        }
      }
    }
  );
  const errors = req.validationErrors();
  if (errors) {
    const allErrors = [];
    errors.forEach((error) => {
      allErrors.push({
        error: error.msg,
      });
    });
    return res.status(409)
      .json(allErrors);
  }
  next();
};

/** Check if user signup with a valid username, email and password
 *
 * @param  {object} req - request
 *
 * @param  {object} res - response
 *
 * @param  {object} next - next
 *
 */

export const checkEditProfileInput = (req, res, next) => {
  req.checkBody(
    {
      username: {
        notEmpty: true,
        isLength: {
          options: [{ min: 5 }],
          errorMessage: 'Please provide a username with atleast 5 characters.'
        }
      }
    }
  );
  const message = req.validationErrors();
  if (message) {
    return res.status(409)
      .json({
        status: false,
        message: message[0].msg
      });
  }
  next();
};

/** Check invalid input for signup field
 *
 * @param  {object} req - request
 *
 * @param  {object} res - response
 *
 * @param  {object} next - next
 */

export const checkUserInvalidInput = (req, res, next) => {
  const numberCheck = /((\d)+)/gi;
  const checkSpace = /(\s){1}/;
  const countMutipleSpace = /(\s){2}/;

  if (numberCheck.test(req.body.username) ||
    checkSpace.test(req.body.username) ||
    /(\s)+/.test(req.body.username[0])) {
    return res.status(400).json({
      status: false,
      message: 'Invalid Username'
    });
  }
  if (checkSpace.test(req.body.password) ||
    /(\s)+/.test(req.body.password[0])) {
    return res.status(400).json({
      status: false,
      message: 'Invalid Password'
    });
  }
  if (numberCheck.test(req.body.fullName) ||
    countMutipleSpace.test(req.body.fullName) ||
    /(\s)+/.test(req.body.fullName[0])) {
    return res.status(400).json({
      status: false,
      message: 'Invalid full name'
    });
  }
  next();
};

/** Check invalid input in the param
 *
 * @param  {object} req - request
 *
 * @param  {object} res - response
 *
 * @param  {object} next - next
 *
 */

export const checkParamInvalidInput = (req, res, next) => {
  if (req.params.recipeId.match(/^[0-9]/) == null) {
    return res.status(400).json({
      status: false,
      message: 'Invalid recipe id'
    });
  }
  next();
};


/** Check invalid input for recipe field
 *
 * @param  {object} req - request
 *
 * @param  {object} res - response
 *
 * @param  {object} next - next
 *
 */

export const checkRecipeInvalidInput = (req, res, next) => {
  const numberCheck = /((\d)+)/gi;
  const countMutipleSpace = /(\s){2}/;

  if (numberCheck.test(req.body.recipeName) ||
    countMutipleSpace.test(req.body.recipeName) ||
    /(\s)+/.test(req.body.recipeName[0])) {
    return res.status(400).json({
      status: false,
      message: 'Invalid Recipe Name'
    });
  }

  if (countMutipleSpace.test(req.body.ingredient) ||
  /(\s)+/.test(req.body.ingredient[0])) {
    return res.status(400).json({
      status: false,
      message: 'Invalid Ingredient'
    });
  }

  if (countMutipleSpace.test(req.body.details) ||
  /(\s)+/.test(req.body.details[0])) {
    return res.status(400).json({
      status: false,
      message: 'Invalid Details'
    });
  }
  next();
};

/** Check invalid input for review field
 *
 * @param  {object} req - request
 *
 * @param  {object} res - response
 *
 * @param  {object} next - next
 *
 */

export const checkReviewInvalidInput = (req, res, next) => {
  if (req.body.review.match(/^[^ ]+( [^ ]+)*$/g) == null) {
    return res.status(400).json({
      status: false,
      message: 'Invalid input'
    });
  }
  next();
};

/** Check if review field is empty
 *
 * @param  {object} req - request
 *
 * @param  {object} res - response
 *
 * @param  {object} next - next
 *
 */

export const checkReviewInput = (req, res, next) => {
  if (!req.body.review) {
    return res.status(400).json({
      status: false,
      message: 'Review can\'t be empty'
    });
  }
  next();
};

/** Check if username and email already exist
 *
 * @param  {object} req - request
 *
 * @param  {object} res - response
 *
 * @param  {object} next - next
 *
 */

export const validateUsers = (req, res, next) => {
  Users
    .findOne({
      where: {
        username: req.body.username
      },
    })
    .then((user) => {
      if (user) {
        return res.status(409).json({
          status: false,
          message: 'Username already exists'
        });
      }
      Users
        .findOne({
          where: {
            email: req.body.email
          },
        })
        .then((email) => {
          if (email) {
            return res.status(409).json({
              status: false,
              message: 'Email already exists'
            });
          }
          next();
        });
    });
};

/** Check if user doesn't provide username and password
 * or if user input an incorrect password
 *
 * @param  {object} req - request
 *
 * @param  {object} res - response
 *
 * @param  {object} next - next
 *
 */

export const validateLoginUser = (req, res, next) => {
  if (!req.body.username) {
    return res.status(400).json({
      status: false,
      message: 'Please provide your username'
    });
  }
  if (!req.body.password) {
    return res.status(400).json({
      status: false,
      message: 'Please provide your password'
    });
  }
  Users
    .findOne({
      where: {
        username: req.body.username,
      },
    })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          status: false,
          message: 'Invalid Credentials'
        });
      } else if (user) {
        bcrypt.compare(req.body.password, user.password, (err, response) => {
          if (response) {
            next();
          } else {
            return res.status(401).json({
              status: false,
              message: 'Invalid Credentials'
            });
          }
        });
      }
    });
};

/** Check if recipe id in param exist
 *
 * @param  {object} req - request
 *
 * @param  {object} res - response
 *
 * @param  {object} next - next
 *
 */

export const validateRecipesId = (req, res, next) => {
  Recipes
    .findOne({
      where: { id: req.params.recipeId }
    })
    .then((recipe) => {
      if (!recipe) {
        return res.status(404).json({
          status: false,
          message: 'No recipe Id found'
        });
      }
      next();
    });
};


/** check if user already favorite recipe
 *
 * @param  {object} req - request
 *
 * @param  {object} res - response
 *
 * @param  {object} next - next
 *
 */

export const validatefavRecipe = (req, res, next) => {
  const { userId } = req.decoded.currentUser;
  favoriteRecipes
    .findOne({
      where: {
        userId,
        recipeId: req.params.recipeId
      }
    })
    .then((favorite) => {
      if (favorite) {
        return res.status(200).json({
          status: false,
          message: 'You already favorite recipe'
        });
      }
      next();
    });
};

/** validate user id
 *
 * @param  {object} req - request
 *
 * @param  {object} res - response
 *
 * @param  {object} next - next
 *
 */

export const validateUserId = (req, res, next) => {
  const { userId } = req.decoded.currentUser;
  Users
    .findOne({
      where: {
        id: userId
      }
    })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          status: false,
          message: 'No user Id found'
        });
      }
      next();
    });
};

/** Upvote recipe in vote table
 *
 * @param  {object} req - request
 *
 * @param  {object} res - response
 *
 * @param  {object} next - next
 *
 */

export const upVote = (req, res, next) => {
  const { userId } = req.decoded.currentUser;
  Votes
    .findOne({
      where: {
        $and: [
          { recipeId: req.params.recipeId },
          { userId, }
        ]
      }
    })
    .then((found) => {
      if (found !== null && found.upvote) {
        return Votes.destroy({
          where: {
            $and: [
              { recipeId: req.params.recipeId },
              { userId, }
            ]
          }
        }).then(() => {
          req.message = 'destroyed';
          next();
        });
      } else if (found !== null && !found.upvote) {
        return found.update({
          upvote: 1,
          downvote: 0
        }).then(() => {
          req.message = 'updated';
          next();
        });
      } else if (found === null) {
        return Votes.create({
          recipeId: req.params.recipeId,
          userId,
          upvote: 1,
          downvote: 0
        }).then(() => {
          req.message = 'created';
          next();
        });
      }
    });
};

/** Downvote recipe in vote table
 *
 * @param  {object} req - request
 *
 * @param  {object} res - response
 *
 * @param  {object} next - next
 *
 */

export const downVote = (req, res, next) => {
  const { userId } = req.decoded.currentUser;
  Votes
    .findOne({
      where: {
        $and: [
          { recipeId: req.params.recipeId },
          { userId, }
        ]
      }
    })
    .then((found) => {
      if (found !== null && found.downvote) {
        return Votes.destroy({
          where: {
            $and: [
              { recipeId: req.params.recipeId },
              { userId, }
            ]
          }
        }).then(() => {
          req.message = 'destroyed';
          next();
        });
      } else if (found !== null && !found.downvote) {
        return found.update({
          upvote: 0,
          downvote: 1
        }).then(() => {
          req.message = 'updated';
          next();
        });
      } else if (found === null) {
        return Votes.create({
          recipeId: req.params.recipeId,
          userId,
          upvote: 0,
          downvote: 1
        }).then(() => {
          req.message = 'created';
          next();
        });
      }
    });
};

/** Verify user input for edit profile field
 *
 * @param  {object} req - request
 *
 * @param  {object} res - response
 *
 * @param  {object} next - next
 *
 */

export const verifyEditUsername = (req, res, next) => {
  const { userId } = req.decoded.currentUser;
  Users
    .findOne({
      where: {
        username: req.body.username
      }
    })
    .then((user) => {
      if (user) {
        Users.findOne({
          where: {
            id: userId
          }
        })
          .then((edit) => {
            if (req.body.username === edit.username) {
              next();
            } else if (req.body.username === user.username &&
              user.username !== edit.username) {
              return res.status(409).json({
                status: false,
                message: 'Username already exist'
              });
            }
          });
      } else {
        next();
      }
    });
};

/** Verify user input for edit profile field
 *
 * @param  {object} req - request
 *
 * @param  {object} res - response
 *
 * @param  {object} next - next
 *
 */

export const verifyEditEmail = (req, res, next) => {
  const { userId } = req.decoded.currentUser;
  Users
    .findOne({
      where: {
        email: req.body.email
      }
    })
    .then((user) => {
      if (user) {
        Users.findOne({
          where: {
            id: userId
          }
        })
          .then((edit) => {
            if (req.body.email === edit.email) {
              next();
            } else if (req.body.email === user.email &&
              user.email !== edit.email) {
              return res.status(409).json({
                status: false,
                message: 'Email already exist'
              });
            }
          });
      } else {
        next();
      }
    });
};

/** user shouldn't be able to edit password while editing profile
 *
 * @param  {object} req - request
 *
 * @param  {object} res - response
 *
 * @param  {object} next - next
 *
 */

export const editProfilePassword = (req, res, next) => {
  if (req.body.password) {
    return res.status(400).json({
      status: false,
      message: 'You cannot edit password here'
    });
  }
  next();
};

/** Check if user already post recipe
 *
 * @param  {object} req - request
 *
 * @param  {object} res - response
 *
 * @param  {object} next - next
 *
 */

export const recipeExist = (req, res, next) => {
  const { userId } = req.decoded.currentUser;
  return Recipes
    .findOne({
      where: {
        userId,
        recipeName: capitalize(req.body.recipeName)
      }
    })
    .then((recipe) => {
      if (!recipe) return next();
      return res.status(409).json({
        status: false,
        message: 'You have already created recipe'
      });
    });
};
