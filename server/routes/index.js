import express from 'express';
import usersController from '../controllers/users';
import recipesController from '../controllers/recipes';
import reviewsController from '../controllers/reviews';
import favoriteRecipesController from '../controllers/favoriteRecipes';
import { validateRecipesId, validateUsersId, checkRecipeInput, checkRecipeId, checkUserId, checkUserInput, validateUsers, validateLoginUser, checkReviewInput, validateUpVote, validateDownVote } from '../middleware/validation';
import * as auth from '../middleware/authentication';


const app = express.Router();


// signup
app.post('/api/users/signup', checkUserInput, validateUsers, usersController.signup);

// signin
app.post('/api/users/signin', validateLoginUser, usersController.signin);

// route middleware to verify a token
app.use(auth.default);

// get all users
app.get('/api/users', usersController.getUsers);

// add recipe
app.post('/api/recipes', checkRecipeInput, recipesController.addRecipe);

// get all recipes
app.get('/api/recipes', recipesController.getRecipes);

// modify recipe
app.put('/api/recipes/:recipeId', validateRecipesId, checkRecipeInput, recipesController.modifyRecipe);

// delete recipe
app.delete('/api/recipes/:recipeId', validateRecipesId, recipesController.deleteRecipe);

// post review
app.post('/api/recipes/:recipeId/reviews', validateRecipesId, checkReviewInput, reviewsController.postReview);

// get reviews
app.get('/api/recipes/:recipeId/reviews', validateRecipesId, reviewsController.getReviews);

// post favorite recipes
app.post('/api/users/:userId/recipes', validateUsersId, checkRecipeId, favoriteRecipesController.favoriteRecipe);

// get all favorite recipes
app.get('/api/users/:userId/recipes', validateUsersId, favoriteRecipesController.getfavoriteRecipe);

// upvote for recipes
app.post('/api/users/upvote/:recipeId', validateRecipesId, checkUserId, validateUpVote, recipesController.upvoteRecipe);

// downvote for recipes
app.post('/api/users/downvote/:recipeId', validateRecipesId, checkUserId, validateDownVote, recipesController.downvoteRecipe);

// get recipes with the most upvote 
app.get('/api/recipes?sort=upvotes&order=descending', recipesController.getUpvoteRecipes);


export default app;
