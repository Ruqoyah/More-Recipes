import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jsonwebtoken from 'jsonwebtoken';
import models from '../models';
import { signupNotification } from '../helper';

dotenv.load();
const secret = process.env.SUPER_SECRET;

const { Users } = models;

const saltRounds = 10;

export default {

  /** Signup user
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   */

  signup(req, res) {
    bcrypt.hash(req.body.password, saltRounds)
      .then((hash) => {
        Users.create({
          fullName: req.body.fullName,
          username: req.body.username,
          email: req.body.email,
          password: hash
        })
          .then((user) => {
            const currentUser = {
              userId: user.id
            };
            const token = jsonwebtoken.sign({
              exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
              currentUser
            }, secret);
            res.status(201).json({
              status: true,
              message: 'You have successfully signed up',
              data: { token }
            });
          })
          .then(() => {
            signupNotification(req);
          })
          .catch(() => res.status(500).json({
            error: 'Internal sever Error'
          }));
      });
  },

  /** Signin user
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   */

  signin(req, res) {
    return Users
      .findOne({
        where: { username: req.body.username }
      })
      .then((user) => {
        const currentUser = {
          userId: user.id
        };
        const token = jsonwebtoken.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
          currentUser },
        secret);
        res.status(200).json({
          status: true,
          message: 'You have successfully signed in!',
          data: { token }
        });
      });
  },

  /** Email or username exist
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   */

  exist(req, res) {
    Users
      .findOne({
        where: {
          $or: [
            {
              username: req.body.username
            },
            {
              email: req.body.email
            }
          ]
        }
      })
      .then((user) => {
        if (user) {
          res.status(200).json({ status: true });
        } else {
          res.status(200).json({ status: false });
        }
      });
  },

  /** Edit Profile
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   */

  editProfile(req, res) {
    const { userId } = req.decoded.currentUser;
    return Users
      .findOne({
        where: {
          id: userId
        }
      })
      .then(user => user
        .update(req.body)
        .then(() => {
          Users.findById(userId)
            .then(result => res.status(200).json({
              status: true,
              message: 'Profile updated sucessfully!',
              data: {
                username: result.username,
                fullName: result.fullName,
                email: result.email,
                picture: result.picture,
                id: result.id
              }
            }));
        }))
      .catch(() => res.status(500).json({
        error: 'Internal sever Error'
      }));
  },

  /** Get User
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   * @return {object} returns an object
   *
   */
  getUser(req, res) {
    const { userId } = req.decoded.currentUser;
    return Users
      .findOne({
        where: { id: userId }
      })
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            message: 'user does not exist'
          });
        }
        return res.status(200).json({
          status: true,
          data: {
            id: user.id,
            username: user.username,
            fullName: user.fullName,
            email: user.email,
            picture: user.picture
          }
        });
      })
      .catch(() => res.status(500).json({
        error: 'Internal sever Error' }
      ));
  }
};
