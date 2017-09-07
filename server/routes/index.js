import express from 'express';
import usersController from '../controllers/users';
import recipesController from '../controllers/recipes';
import reviewsController from '../controllers/reviews';
import favoriteRecipesController from '../controllers/favoriteRecipes';
import { validateRecipesId, validateUsersId, checkRecipeInput, checkRecipeId, checkUserId, checkUserInput, validateUsers, validateLoginUser, checkReviewInput, validateUpVote, validateDownVote } from '../middleware/validation';
import * as auth from '../middleware/authentication';


const app = express.Router();

/**
 * @param  {} '/api/v1/users/signup'
 * @param  {} checkUserInput
 * @param  {} validateUsers
 * @param  {} usersController.signup
 */
app.post('/api/v1/users/signup', checkUserInput, validateUsers, usersController.signup);

/**
 * @param  {} '/api/v1/users/signin'
 * @param  {} validateLoginUser
 * @param  {} usersController.signin
 */
app.post('/api/v1/users/signin', validateLoginUser, usersController.signin);

/**
 * @param  {} auth.default
 */
app.use(auth.default);

/**
 * @param  {} '/api/v1/users'
 * @param  {} usersController.getUsers
 */
app.get('/api/v1/users', usersController.getUsers);

/**
 * @param  {} '/api/v1/recipes'
 * @param  {} checkRecipeInput
 * @param  {} recipesController.addRecipe
 */
app.post('/api/v1/recipes', checkRecipeInput, recipesController.addRecipe);

/**
 * @param  {} '/api/v1/recipes'
 * @param  {} recipesController.getRecipes
 */
app.get('/api/v1/recipes', recipesController.getRecipes);

/**
 * @param  {recipeId'} '/api/v1/recipes/
 * @param  {} validateRecipesId
 * @param  {} checkRecipeInput
 * @param  {} recipesController.modifyRecipe
 */
app.put('/api/v1/recipes/:recipeId', validateRecipesId, checkRecipeInput, recipesController.modifyRecipe);

/**
 * @param  {recipeId'} '/api/v1/recipes/
 * @param  {} validateRecipesId
 * @param  {} recipesController.deleteRecipe
 */
app.delete('/api/v1/recipes/:recipeId', validateRecipesId, recipesController.deleteRecipe);

/**
 * @param  {recipeId/reviews'} '/api/v1/recipes/
 * @param  {} validateRecipesId
 * @param  {} checkReviewInput
 * @param  {} reviewsController.postReview
 */
app.post('/api/v1/recipes/:recipeId/reviews', validateRecipesId, checkReviewInput, reviewsController.postReview);

/**
 * @param  {recipeId/reviews'} '/api/v1/recipes/
 * @param  {} validateRecipesId
 * @param  {} reviewsController.getReviews
 */
app.get('/api/v1/recipes/:recipeId/reviews', validateRecipesId, reviewsController.getReviews);

/**
 * @param  {userId/recipes'} '/api/v1/users/
 * @param  {} validateUsersId
 * @param  {} checkRecipeId
 * @param  {} favoriteRecipesController.favoriteRecipe
 */
app.post('/api/v1/users/:userId/recipes', validateUsersId, checkRecipeId, favoriteRecipesController.favoriteRecipe);

/**
 * @param  {userId/recipes'} '/api/v1/users/
 * @param  {} validateUsersId
 * @param  {} favoriteRecipesController.getfavoriteRecipe
 */
app.get('/api/v1/users/:userId/recipes', validateUsersId, favoriteRecipesController.getfavoriteRecipe);

/**
 * @param  {recipeId'} '/api/v1/users/upvote/
 * @param  {} validateRecipesId
 * @param  {} checkUserId
 * @param  {} validateUpVote
 * @param  {} recipesController.upvoteRecipe
 */
app.post('/api/v1/users/upvote/:recipeId', validateRecipesId, checkUserId, validateUpVote, recipesController.upvoteRecipe);

/**
 * @param  {recipeId'} '/api/v1/users/downvote/
 * @param  {} validateRecipesId
 * @param  {} checkUserId
 * @param  {} validateDownVote
 * @param  {} recipesController.downvoteRecipe
 */
app.post('/api/v1/users/downvote/:recipeId', validateRecipesId, checkUserId, validateDownVote, recipesController.downvoteRecipe);

/**
 * @param  {} '/api/v1/recipes?sort=upvotes&order=descending'
 * @param  {} recipesController.getUpvoteRecipes
 */
app.get('/api/v1/recipes?sort=upvotes&order=descending', recipesController.getUpvoteRecipes);


export default app;
