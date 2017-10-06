import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../models';

dotenv.load();
const secret = process.env.superSecret;

const { Users } = db;

const saltRounds = 10;

export default {

  /** Signup user
   * @param  {object} req - request
   * @param  {object} res - response
   */

  signup(req, res) {
    bcrypt.hash(req.body.password, saltRounds)
      .then((hash) => {
        Users.create({
          fullName: req.body.fullName,
          username: req.body.username,
          email: req.body.email,
          isAdmin: req.body.isAdmin,
          password: hash
        })
          .then((user) => {
            const currentUser = { userId: user.id,
              username: user.username,
              fullname: user.fullName,
              isAdmin: user.isAdmin
            };
            const token = jwt.sign({ currentUser }, secret);
            res.status(201).json({
              message: 'You have successfully signed up',
              data: { token, userId: user.id, }
            });
          })
          .catch(error => res.status(400).json(error));
      });
  },

  /** Signin user
   * @param  {object} req - request
   * @param  {object} res - response
   */

  signin(req, res) {
    return Users
      .findOne({
        where: { username: req.body.username }
      })
      .then((user) => {
        const currentUser = { userId: user.id,
          username: user.username,
          fullname: user.fullName,
          isAdmin: user.isAdmin
        };
        const token = jwt.sign({ currentUser }, secret);
        res.status(200).json({
          status: true,
          message: 'You have successfully signed in!',
          data: { token, userId: user.id }
        });
      });
  },

  userExist(req, res) {
    Users
      .findOne({
        where: {
          username: req.body.username
        },
      })
      .then((user) => {
        if (user) {
          res.status(200).send(true);
        } else {
          res.status(200).send(false);
        }
      });
  },

  emailExist(req, res) {
    Users
      .findOne({
        where: {
          email: req.body.email
        },
      })
      .then((user) => {
        if (user) {
          res.status(200).send(true);
        } else {
          res.status(200).send(false);
        }
      });
  },

  editProfile(req, res) {
    return Users
      .findOne({ where: {
        id: req.params.userId }
      })
      .then(user => user
        .update({
          username: req.body.username || user.username,
          fullName: req.body.fullName || user.fullName,
          email: req.body.email || user.email,
          password: req.body.password || user.password
        })
        .then(() => {
          Users.findById(req.params.userId).then(result => res.status(200).json({
            status: 'success',
            message: 'Profile update sucessfully!',
            data: {
              username: result.username,
              fullName: result.fullName,
              email: result.email,
              id: result.id }
          }));
        }))
      .catch(error => res.status(400).json(error));
  },

  getUser(req, res) {
    return Users
      .findOne({
        where: { id: req.params.userId }
      })
      .then((user) => {
        if (user.length < 1) {
          return res.status(404).json({
            message: 'user does not exist'
          });
        }
        return res.status(200).json({
          id: user.id,
          username: user.username,
          fullName: user.fullName,
          email: user.email
        });
      })
      .catch(error => res.status(404).json(error));
  }
};
