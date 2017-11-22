import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import winston from 'winston';
import dotenv from 'dotenv';
import db from '../models/';

dotenv.load();

const { Recipes, Users, favoriteRecipes, Votes } = db;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
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

export const reviewNotification = (req) => {
  Recipes
    .findOne({ where: { id: req.params.recipeId } })
    .then((recipe) => {
      Users
        .findOne({ where: { id: recipe.userId } })
        .then((user) => {
          const mailOptions = {
            from: '"More-Recipes" <rukayatodukoya123@gmail.com>',
            to: user.email,
            subject: 'You have a new Review',
            text: 'Someone just review your recipe, click on the link below to check',
          };

          transporter.sendMail(mailOptions, (error, response) => {
            if (error) {
              winston.info('Email not sent!');
              return winston.info(error);
            }
            winston.info('Email sent to: %s', response);
          });
        });
    });
};


/** Get a signup notification
 * @param  {object} req - request
 * @param  {object} res - response
 * @param  {object} next - next
 */

export const signupNotification = (req) => {
  Users
    .findOne({
      where: {
        email: req.body.email
      },
    })
    .then((user) => {
      const mailOptions = {
        from: '"More-Recipes" <rukayatodukoya123@gmail.com>',
        to: user.email,
        subject: 'Your More-Recipes account has been created',
        text: `Thank you for signing up with More-Recipes, username: ${user.username}`,
      };

      transporter.sendMail(mailOptions, (error, response) => {
        if (error) {
          winston.info(error);
        }
        winston.info('Email sent to: %s', response);
      });
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
  if (req.body.username.match(/^[A-Za-z0-9]+$/g) == null) {
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
  if (req.body.recipeName.match(/^[A-Za-z0-9][^ ]+( [^]+)*$/g) == null) {
    return res.status(409).json({ status: false, message: 'Invalid Recipe Name' });
  }
  if (req.body.ingredient.match(/^[A-Za-z0-9][^ ]+( [^]+)*$/g) == null) {
    return res.status(409).json({ status: false, message: 'Invalid Ingredient' });
  }
  if (req.body.details.match(/^[A-Za-z0-9][^ ]+( [^]+)*$/g) == null) {
    return res.status(409).json({ status: false, message: 'Invalid Details' });
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
        username: req.body.username,
      },
    })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ status: false, message: 'Invalid Credentials' });
      } else if (user) {
        bcrypt.compare(req.body.password, user.password, (err, response) => {
          if (response) {
            next();
          } else {
            return res.status(401).json({ status: false, message: 'Invalid Credentials' });
          }
        });
      }
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
        return res.status(200).json({
          status: false,
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

/** Upvote recipe in vote table
 * @param  {object} req - request
 * @param  {object} res - response
 * @param  {object} next - next
 */

export const upVote = (req, res, next) => {
  Votes
    .findOne({
      where: {
        $and: [
          { recipeId: req.params.recipeId },
          { userId: req.body.userId, }
        ]
      }
    })
    .then((found) => {
      if (found !== null && found.upvote) {
        return Votes.destroy({
          where: {
            $and: [
              { recipeId: req.params.recipeId },
              { userId: req.body.userId, }
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
          userId: req.body.userId,
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
 * @param  {object} req - request
 * @param  {object} res - response
 * @param  {object} next - next
 */

export const downVote = (req, res, next) => {
  Votes
    .findOne({
      where: {
        $and: [
          { recipeId: req.params.recipeId },
          { userId: req.body.userId, }
        ]
      }
    })
    .then((found) => {
      if (found !== null && found.downvote) {
        return Votes.destroy({
          where: {
            $and: [
              { recipeId: req.params.recipeId },
              { userId: req.body.userId, }
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
          userId: req.body.userId,
          upvote: 0,
          downvote: 1
        }).then(() => {
          req.message = 'created';
          next();
        });
      }
    });
};

export const verifyEditUsername = (req, res, next) => {
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
            id: req.params.userId
          }
        })
          .then((edit) => {
            if (req.body.username === edit.username) {
              next();
            } else if (req.body.username === user.username && user.username !== edit.username) {
              return res.status(409).send({ message: 'Username already exist' });
            }
          });
      } else {
        next();
      }
    });
};

export const verifyEditEmail = (req, res, next) => {
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
            id: req.params.userId
          }
        })
          .then((edit) => {
            if (req.body.email === edit.email) {
              next();
            } else if (req.body.email === user.email && user.email !== edit.email) {
              return res.status(409).send({ message: 'Email already exist' });
            }
          });
      } else {
        next();
      }
    });
};

