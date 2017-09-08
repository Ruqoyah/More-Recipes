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
          password: hash,
          cpassword: hash
        })
          .then(display => res.status(201).json({
            status: 'success',
            message: 'You have successfully signed up',
            username: display.username
          }))
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
        res.status(201).json({
          status: 'success',
          message: 'You have successfully signed in!',
          data: { token, userId: user.id }
        });
      });
  },

  /** Get users
   * @param  {object} req - request
   * @param  {object} res - response
   */

  getUsers(req, res) {
    return Users
      .findAll()
      .then((users) => {
        if (users.length < 1) {
          res.status(404).json({
            message: 'No User found'
          });
        } else {
          res.status(201).json(users);
        }
      })
      .catch(error => res.status(404).json(error));
  }
};
