import nodemailer from 'nodemailer';
import winston from 'winston';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import db from '../models/';
import recipes from '../controllers/recipes';

dotenv.load();

const { Recipes, Users, favoriteRecipes, Votes } = db;

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

/** Get notification each time recipe get review
 * @param  {object} req - request
 * @param  {object} res - response
 * @param  {object} next - next
 */

export const reviewNotification = (req, res, next) => {
  Recipes
    .findOne({ where: { id: req.params.recipeId } })
    .then((recipe) => {
      Users
        .findOne({ where: { id: recipe.userId } })
        .then((user) => {
          const mailOptions = {
            from: '"More-Recipes" <rukayatodukoya123@gmail.com@gmail.com>',
            to: user.email,
            subject: 'You have a new Review',
            text: 'Someone just review your recipe, click on the link below to check',
          };

          transporter.sendMail(mailOptions, (error, res) => {
            if (error) {
              winston.info(error);
            }
            winston.info('Email sent to: %s', res);
            next();
          });
        });
    });
};

/** Get a signup notification
 * @param  {object} req - request
 * @param  {object} res - response
 * @param  {object} next - next
 */

export const signupNotification = (req, res, next) => {
  Users
    .findOne({
      where: {
        username: req.body.username
      },
    })
    .then((user) => {
      if (user) {
        return res.status(400).json({ username: 'Username already exists' });
      }
      Users
        .findOne({
          where: {
            email: req.body.email
          },
        })
        .then((email) => {
          if (email) {
            return res.status(400).json({ email: 'Email already exists' });
          }
          const mailOptions = {
            from: '"More-Recipes" <rukayatodukoya123@gmail.com@gmail.com>',
            to: `${req.body.email}`,
            subject: 'Your More-Recipes account has been created',
            text: `Thank you for signing up with More-Recipes, username: ${req.body.username}`,
          };

          transporter.sendMail(mailOptions, (error, res) => {
            if (error) {
              winston.info(error);
            }
            winston.info('Email sent to: %s', res);
          });

          next();
        });
    });
};

/** Get notification when favourite recipe is updated
 * @param  {object} req - request
 * @param  {object} res - response
 * @param  {object} next - next
 */

export const favRecipeNotification = (req, res, next) => {
  favoriteRecipes
    .findOne({ where: {
      id: req.params.recipeId } })
    .then((recipe) => {
      if (!recipe) {
        recipes.modifyRecipe(req, res);
      } else {
        Users
          .findOne({ where: { id: recipe.userId } })
          .then((user) => {
            const mailOptions = {
              from: '"More-Recipes" <rukayatodukoya123@gmail.com@gmail.com>',
              to: user.email,
              subject: 'Edit Recipe',
              text: 'One of your favorite recipe has been modify, click on the link below to check',
            };

            transporter.sendMail(mailOptions, (error, res) => {
              if (error) {
                winston.info(error);
              }
              winston.info('Email sent to: %s', res);
              next();
            });
          });
      }
    });
};

/** Check if user recipe input is empty
 * @param  {object} req - request
 * @param  {object} res - response
 * @param  {object} next - next
 */

export const checkRecipeInput = (req, res, next) => {
  if (!req.body.recipeName) {
    return res.status(400).json({ message: 'Enter recipe name' });
  }
  if (!req.body.ingredient) {
    return res.status(400).json({ message: 'Input ingredient' });
  }
  if (!req.body.details) {
    return res.status(400).json({ message: 'Input details' });
  }
  next();
};

/** Check if user signup input is empty
 * @param  {object} req - request
 * @param  {object} res - response
 * @param  {object} next - next
 */

export const checkUserInput = (req, res, next) => {
  if (!req.body.username) {
    return res.status(400).json({ message: 'Username is required' });
  }
  if (!req.body.fullName) {
    return res.status(400).json({ message: 'fullName is required' });
  }
  if (!req.body.email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  if (!req.body.password) {
    return res.status(400).json({ message: 'Password is required' });
  }
  next();
};


/** Check if user signup with a valid username, email and password
 * @param  {object} req - request
 * @param  {object} res - response
 * @param  {object} next - next
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

/** Check invalid input for users
 * @param  {object} req - request
 * @param  {object} res - response
 * @param  {object} next - next
 */

export const checkUserInvalidInput = (req, res, next) => {
  if (req.body.username.match(/^[a-z]+$/g) == null) {
    return res.status(409).json({ message: 'Invalid Username' });
  }
  if (req.body.password.match(/^([^ ]+)*$/g) == null) {
    return res.status(409).json({ message: 'Invalid Password' });
  }
  if (req.body.fullName.match(/^\w+( +\w+)*$/g) == null) {
    return res.status(409).json({ message: 'Invalid Input' });
  }
  next();
};


/** Check invalid input for recipe
 * @param  {object} req - request
 * @param  {object} res - response
 * @param  {object} next - next
 */

export const checkRecipeInvalidInput = (req, res, next) => {
  if (req.body.recipeName.match(/^[^ ]+( [^ ]+)*$/g) == null) {
    return res.status(409).json({ message: 'Invalid Recipe Name' });
  }
  if (req.body.ingredient.match(/^[^ ]+( [^ ]+)*$/g) == null) {
    return res.status(409).json({ message: 'Invalid Ingredient' });
  }
  if (req.body.details.match(/^[^ ]+( [^ ]+)*$/g) == null) {
    return res.status(409).json({ message: 'Invalid Details' });
  }
  next();
};

/** Check invalid input for review recipe
 * @param  {object} req - request
 * @param  {object} res - response
 * @param  {object} next - next
 */

export const checkReviewInvalidInput = (req, res, next) => {
  if (req.body.review.match(/^[^ ]+( [^ ]+)*$/g) == null) {
    return res.status(409).json({ message: 'Invalid input' });
  }
  next();
};

/** Check if review and user id is empty
 * @param  {object} req - request
 * @param  {object} res - response
 * @param  {object} next - next
 */

export const checkReviewInput = (req, res, next) => {
  if (!req.body.review) {
    return res.status(400).json({ message: 'Review can\'t be empty' });
  }
  if (!req.body.userId) {
    return res.status(400).json({ message: 'You need to enter your user Id' });
  }
  next();
};

/** Check if recipe id input in body exist or empty
 * @param  {object} req - request
 * @param  {object} res - response
 * @param  {object} next - next
 */

export const checkRecipeId = (req, res, next) => {
  Recipes
    .findOne({
      where: {
        id: req.body.recipeId
      }
    })
    .then((recipe) => {
      if (!recipe) {
        return res.status(404).json({
          message: 'recipe Id does not exist'
        });
      }
    });
  if (!req.body.recipeId) {
    return res.status(400).json({ message: 'Recipe Id can\'t be empty' });
  }
  next();
};

/** Check if user id input in body exist or empty
 * @param  {object} req - request
 * @param  {object} res - response
 * @param  {object} next - next
 */

export const checkUserId = (req, res, next) => {
  if (!req.body.userId) {
    return res.status(400).json({ message: 'User Id can\'t be empty' });
  }
  Users
    .findOne({
      where: {
        id: req.body.userId
      }
    })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: 'User Id does not exist'
        });
      }
      next();
    });
};

/** Check if username and email already exist and password does not match
 * @param  {object} req - request
 * @param  {object} res - response
 * @param  {object} next - next
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
        return res.status(400).json({ message: 'Username already exists' });
      }
      Users
        .findOne({
          where: {
            email: req.body.email
          },
        })
        .then((email) => {
          if (email) {
            return res.status(400).json({ message: 'Email already exists' });
          }
          next();
        });
    });
};

/** Check if user exist and if input an incorrect password
 * @param  {object} req - request
 * @param  {object} res - response
 * @param  {object} next - next
 */

export const validateLoginUser = (req, res, next) => {
  if (!req.body.username) {
    return res.status(400).json({
      message: 'Please provide your username'
    });
  }
  if (!req.body.password) {
    return res.status(400).json({
      message: 'Please provide your password'
    });
  }
  Users
    .findOne({
      where: {
        username: req.body.username
      },
    })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ status: false, message: 'Invalid Credentials' });
      }
      next();
    });
};

/** Check if recipe id input in param exist
 * @param  {object} req - request
 * @param  {object} res - response
 * @param  {object} next - next
 */

export const validateRecipesId = (req, res, next) => {
  Recipes
    .findOne({
      where: { id: req.params.recipeId }
    })
    .then((recipe) => {
      if (!recipe) {
        return res.status(404).json({
          message: 'No recipe Id found'
        });
      }
      next();
    });
};

/** check if favorite recipe already exist
 * @param  {object} req - request
 * @param  {object} res - response
 * @param  {object} next - next
 */

export const validatefavRecipe = (req, res, next) => {
  favoriteRecipes
    .findOne({
      where: {
        userId: req.body.userId,
        recipeId: req.params.recipeId
      }
    })
    .then((favorite) => {
      if (favorite) {
        return res.status(400).json({
          message: 'You already favorite recipe'
        });
      }
      next();
    });
};

/** Check if user id input in param exist
 * @param  {object} req - request
 * @param  {object} res - response
 * @param  {object} next - next
 */

export const validateUsersId = (req, res, next) => {
  if (!req.body.userId) {
    return res.status(400).json({ message: 'User Id can\'t be empty' });
  }
  Users
    .findOne({
      where: {
        id: req.body.userId
      }
    })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: 'No user Id found'
        });
      }
      next();
    });
};

/** validate user id param
 * @param  {object} req - request
 * @param  {object} res - response
 * @param  {object} next - next
 */

export const validateParamUserId = (req, res, next) => {
  Users
    .findOne({
      where: {
        id: req.params.userId
      }
    })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: 'No user Id found'
        });
      }
      next();
    });
};

/** Upvote vote table
 * @param  {object} req - request
 * @param  {object} res - response
 * @param  {object} next - next
 */

export const validateUpVote = (req, res, next) => {
  Votes
    .findOne({
      where: {
        userId: req.body.userId,
        recipeId: req.params.recipeId
      }
    })
    .then((vote) => {
      if (vote) {
        return res.status(400).json({
          message: 'You already upvoted'
        });
      }
      Votes
        .create({
          recipeId: req.params.recipeId,
          userId: req.body.userId
        })
        .then((upvote) => {
          res.status(200).json({
            status: 'success',
            message: 'Upvote added successfully!',
            data: { userId: upvote.userId, recipeId: upvote.recipeId }
          });
        });
      next();
    });
};

/** Destroy user id from vote table if user downvote
 * @param  {object} req - request
 * @param  {object} res - response
 * @param  {object} next - next
 */

export const validateDownVote = (req, res, next) => {
  Votes
    .findOne({
      where: {
        userId: req.body.userId,
        recipeId: req.params.recipeId
      }
    })
    .then((vote) => {
      if (!vote) {
        return res.status(400).json({
          message: 'You already downvoted'
        });
      }
      Votes
        .destroy({
          where: {
            userId: req.body.userId,
            recipeId: req.params.recipeId
          }
        })
        .then(() => {
          res.status(200).json({
            status: 'success',
            message: 'Downvote added successfully!',
            data: { userId: vote.userId, recipeId: vote.recipeId }
          });
        });
      next();
    });
};

