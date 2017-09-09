import express from 'express';
import usersController from '../controllers/users';
import recipesController from '../controllers/recipes';
import reviewsController from '../controllers/reviews';
import favoriteRecipesController from '../controllers/favoriteRecipes';
import { validateRecipesId, validateUsersId, checkRecipeInput, checkUserId, checkUserInput, checkValidUserInput, checkUserInvalidInput, checkRecipeInvalidInput, checkReviewInvalidInput, validateParamUserId, validateUsers, validateLoginUser, checkReviewInput, validateUpVote, validateDownVote } from '../middleware/validation';
import * as auth from '../middleware/authentication';


const app = express.Router();

/** Signup
 * @param  {} '/api/v1/users/signup'
 * @param  {} checkUserInput
 * @param  {} validateUsers
 * @param  {} usersController.signup
 */
app.post('/api/v1/users/signup', checkUserInput, checkValidUserInput, checkUserInvalidInput, validateUsers, usersController.signup);

/** Signin
 * @param  {} '/api/v1/users/signin'
 * @param  {} validateLoginUser
 * @param  {} usersController.signin
 */
app.post('/api/v1/users/signin', validateLoginUser, usersController.signin);

/** route middleware to verify token
 * @param  {object} auth.default
 */
app.use(auth.default);

/** Get all users
 * @param  {} '/api/v1/users'
 * @param  {} usersController.getUsers
 */
app.get('/api/v1/users', usersController.getUsers);

/** Add recipe
 * @param  {} '/api/v1/recipes'
 * @param  {} checkRecipeInput
 * @param  {} recipesController.addRecipe
 */
app.post('/api/v1/recipes', checkRecipeInput, checkRecipeInvalidInput, recipesController.addRecipe);

/** Get all recipes
 * @param  {} '/api/v1/recipes'
 * @param  {} recipesController.getRecipes
 */
app.get('/api/v1/recipes', recipesController.getRecipes);

/** Modify recipe
 * @param  {recipeId'} '/api/v1/recipes/
 * @param  {} validateRecipesId
 * @param  {} checkRecipeInput
 * @param  {} recipesController.modifyRecipe
 */
app.put('/api/v1/recipes/:recipeId', validateRecipesId, checkRecipeInput, checkRecipeInvalidInput, recipesController.modifyRecipe);

/** Delete recipe
 * @param  {recipeId'} '/api/v1/recipes/
 * @param  {} validateRecipesId
 * @param  {} recipesController.deleteRecipe
 */
app.delete('/api/v1/recipes/:recipeId', validateRecipesId, recipesController.deleteRecipe);

/** Post review
 * @param  {recipeId/reviews'} '/api/v1/recipes/
 * @param  {} validateRecipesId
 * @param  {} checkReviewInput
 * @param  {} reviewsController.postReview
 */
app.post('/api/v1/recipes/:recipeId/reviews', validateRecipesId, checkReviewInput, checkReviewInvalidInput, reviewsController.postReview);

/** Get reviews
 * @param  {recipeId/reviews'} '/api/v1/recipes/
 * @param  {} validateRecipesId
 * @param  {} reviewsController.getReviews
 */
app.get('/api/v1/recipes/:recipeId/reviews', validateRecipesId, reviewsController.getReviews);


/**
 * @param  {recipeId/recipes'} '/api/v1/users/
 * @param  {} checkUserId
 * @param  {} validateRecipesId
 * @param  {} favoriteRecipesController.favoriteRecipe
 */
app.post('/api/v1/users/:recipeId/recipes', validateRecipesId, validateUsersId, favoriteRecipesController.favoriteRecipe);

/** Get favorite recipes
 * @param  {userId/recipes'} '/api/v1/users/
 * @param  {} validateUsersId
 * @param  {} favoriteRecipesController.getfavoriteRecipe
 */
app.get('/api/v1/users/:userId/recipes', validateParamUserId, favoriteRecipesController.getfavoriteRecipe);

/** Upvote recipe
 * @param  {recipeId'} '/api/v1/users/upvote/
 * @param  {} validateRecipesId
 * @param  {} checkUserId
 * @param  {} validateUpVote
 * @param  {} recipesController.upvoteRecipe
 */
app.post('/api/v1/users/upvote/:recipeId', validateRecipesId, checkUserId, validateUpVote, recipesController.upvoteRecipe);

/** Downvote recipe
 * @param  {recipeId'} '/api/v1/users/downvote/
 * @param  {} validateRecipesId
 * @param  {} checkUserId
 * @param  {} validateDownVote
 * @param  {} recipesController.downvoteRecipe
 */
app.post('/api/v1/users/downvote/:recipeId', validateRecipesId, checkUserId, validateDownVote, recipesController.downvoteRecipe);


export default app;
