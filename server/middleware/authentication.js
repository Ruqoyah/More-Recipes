import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.load();

const key = process.env.superSecret;

/** Checks if logged in user has valid AUTH token
 * @param  {object} req - request
 * @param  {object} res - response
 * @param  {object} next - next
 */

export default (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['access-token'];
  if (token) {
    jwt.verify(token, key, (err, decoded) => {
      if (err) {
        res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).json({
      success: false,
      message: 'No token provided.'
    });
  }
};
