import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../models/';

dotenv.load();

const key = process.env.superSecret;
const { Users } = db;

export default {

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
  },

  /** Checks if logged in user has valid AUTH token
   * @param  {object} req - request
   * @param  {object} res - response
   */

  isLoggedIn(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['access-token'];
    if (token) {
      jwt.verify(token, key, (err, decoded) => {
        if (err) {
          res.status(401).json({ status: 'fail', message: 'Failed to authenticate token.' });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(403).json({
        status: 'fail',
        message: 'No token provided.'
      });
    }
  },

  /** Checks if currently logged in user is an admin
   * @param  {object} req - request
   * @param  {object} res - response
   */

  isAdmin(req, res, next) {
    const decodedToken = req.decoded;
    if (typeof decodedToken.currentUser.isAdmin === 'undefined') {
      return res.status(403)
        .send({
          message: 'You do not have permission to perform that operation'
        });
    } else if (decodedToken.currentUser.isAdmin === 1) {
      next();
    } else {
      return res.status(403)
        .send({
          message: 'You do not have permission to perform that operation'
        });
    }
  }
};
