import express from 'express';
import jwt from 'jsonwebtoken';
import usersController from '../controllers/users';

const app = express.Router();


// signup
app.post('/api/users/signup', usersController.signup);

// signin
app.post('/api/users/signin', usersController.signin);

// route middleware to verify a token
app.use((req, res, next) => {
  // check header or url parameters or post parameters for token
  const token = req.body.token || req.query.token || req.headers['access-token'];

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, 'superSecret', (err, decoded) => {
      if (err) {
        res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
});


export default app;
