import dotenv from 'dotenv';
import jsonwebtoken from 'jsonwebtoken';

dotenv.load();

const key = process.env.SUPER_SECRET;

export default {

  /** Authenticate Users
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   */

  authenticate(req, res, next) {
    let token;
    const tokenAvailable = req.headers.authorization ||
    req.body.token || req.query.token || req.headers['x-access-token'];
    if (req.headers.authorization) {
      token = req.headers.authorization.split(' ')[1];
    } else {
      token = tokenAvailable;
    }
    if (token) {
      jsonwebtoken.verify(token, key, (err, decoded) => {
        if (err) {
          res.status(401).json({
            status: false,
            message: 'Failed to authenticate token.'
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(401).json({
        status: false,
        message: 'No token provided.'
      });
    }
  }
};
