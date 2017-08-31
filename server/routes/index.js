import express from 'express';
import usersController from '../controllers/users';
import recipesController from '../controllers/recipes';
import * as auth from '../middleware/authentication';

const app = express.Router();


// signup
app.post('/api/users/signup', usersController.signup);

// signin
app.post('/api/users/signin', usersController.signin);

// route middleware to verify a token
app.use(auth.default);

// signin
app.get('/api/users', usersController.getUsers);

// add recipe
app.post('/api/recipes', recipesController.addRecipes);


export default app;
