import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../models';

dotenv.load();
const secret = process.env.superSecret;

const { Users } = db;

const saltRounds = 10;

export default {
  // create user
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
          .then(display => res.status(201).send({
            success: true,
            message: 'You have successfully signed up',
            username: display.username
          }))
          .catch(error => res.status(400).send(error));
      });
  },


  // user signin
  signin(req, res) {
    Users
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
          success: true,
          message: 'You have successfully signed in!',
          token,
          userId: user.id
        });
      });
  },

  // get all users
  getUsers(req, res) {
    Users
      .findAll({})
      .then((users) => {
        if (users.length < 1) {
          res.status(404).send({
            message: 'No User found'
          });
        } else {
          res.status(201).send(users);
        }
      })
      .catch(error => res.status(404).send(error));
  }
};
