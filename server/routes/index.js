import express from 'express';
import usersController from '../controllers/users';
import recipesController from '../controllers/recipes';
import reviewsController from '../controllers/reviews';
import favoriteRecipesController from '../controllers/favoriteRecipes';
import searchRecipesController from '../controllers/searchRecipes';
import { validateRecipesId, validateUsersId, checkRecipeInput, checkUserId,
  checkUserInput, checkValidUserInput, checkUserInvalidInput, checkRecipeInvalidInput,
  checkReviewInvalidInput, validateParamUserId, validateUsers, validateLoginUser, checkReviewInput,
  reviewNotification, signupNotification, favRecipeNotification, validatefavRecipe, validateUpVote, validateDownVote } from '../middleware/validation';
import authentication from '../middleware/authentication';


const app = express.Router();

/** Signup
 * @param  {} '/api/v1/users/signup'
 * @param  {} checkUserInput
 * @param  {} validateUsers
 * @param  {} usersController.signup
 */
app.post('/api/v1/users/signup', checkUserInput, checkValidUserInput, checkUserInvalidInput, signupNotification,
  validateUsers, usersController.signup);

/** Signin
 * @param  {} '/api/v1/users/signin'
 * @param  {} validateLoginUser
 * @param  {} usersController.signin
 */
app.post('/api/v1/users/signin', validateLoginUser, usersController.signin);

/** User Exist
 * @param  {} '/api/v1/users/signup'
 * @param  {} checkUserInput
 * @param  {} validateUsers
 * @param  {} usersController.userExist
 */
app.post('/api/v1/users/userexist', usersController.userExist);

/** Email Exist
 * @param  {} '/api/v1/users/signup'
 * @param  {} checkUserInput
 * @param  {} validateUsers
 * @param  {} usersController.emailExist
 */
app.post('/api/v1/users/emailexist', usersController.emailExist);

/** Get all users
 * @param  {} '/api/v1/users'
 * @param  {} authentication.isLoggedIn
 * @param  {} usersController.getUsers
 */
app.get('/api/v1/users', authentication.isLoggedIn, authentication.isAdmin, authentication.getUsers);

/** Add recipe
 * @param  {} '/api/v1/recipes'
 * @param  {} authentication.isLoggedIn
 * @param  {} checkRecipeInput
 * @param  {} recipesController.addRecipe
 */
app.post('/api/v1/recipes', authentication.isLoggedIn, validateUsersId, checkRecipeInput, checkRecipeInvalidInput, recipesController.addRecipe);

/** Get all recipes
 * @param  {} '/api/v1/recipes'
 * @param  {} authentication.isLoggedIn
 * @param  {} recipesController.getRecipes
 */
app.get('/api/v1/:userId/recipes', authentication.isLoggedIn, recipesController.getUserRecipes);

/** Get all recipes
 * @param  {} '/api/v1/recipes'
 * @param  {} authentication.isLoggedIn
 * @param  {} recipesController.getRecipes
 */
app.get('/api/v1/recipes', authentication.isLoggedIn, searchRecipesController.getAllRecipes);

/** Modify recipe
 * @param  {recipeId'} '/api/v1/recipes/
 * @param  {} authentication.isLoggedIn
 * @param  {} validateRecipesId
 * @param  {} checkRecipeInput
 * @param  {} recipesController.modifyRecipe
 */
app.put('/api/v1/recipes/:recipeId', authentication.isLoggedIn, validateRecipesId, favRecipeNotification, recipesController.modifyRecipe);

/** View Recipe
 * @param  {recipeId'} '/api/v1/recipes/
 * @param  {} authentication.isLoggedIn
 * @param  {} validateRecipesId
 * @param  {} checkRecipeInput
 * @param  {} recipesController.modifyRecipe
 */
app.get('/api/v1/recipes/:recipeId', authentication.isLoggedIn, validateRecipesId, recipesController.viewRecipe);

/** Delete recipe
 * @param  {recipeId'} '/api/v1/recipes/
 * @param  {} authentication.isLoggedIn
 * @param  {} validateRecipesId
 * @param  {} recipesController.deleteRecipe
 */
app.delete('/api/v1/recipes/:recipeId', authentication.isLoggedIn, validateRecipesId, recipesController.deleteRecipe);

/** Post review
 * @param  {recipeId/reviews'} '/api/v1/recipes/
 * @param  {} authentication.isLoggedIn
 * @param  {} validateRecipesId
 * @param  {} checkReviewInput
 * @param  {} reviewsController.postReview
 */
app.post('/api/v1/recipes/:recipeId/reviews', authentication.isLoggedIn, validateRecipesId, checkReviewInput, checkReviewInvalidInput, reviewNotification, reviewsController.postReview);

/** Get reviews
 * @param  {recipeId/reviews'} '/api/v1/recipes/
 * @param  {} authentication.isLoggedIn
 * @param  {} validateRecipesId
 * @param  {} reviewsController.getReviews
 */
app.get('/api/v1/recipes/:recipeId/reviews', authentication.isLoggedIn, validateRecipesId, reviewsController.getReviews);

/**
 * @param  {recipeId/recipes'} '/api/v1/users/
 * @param  {} authentication.isLoggedIn
 * @param  {} validateRecipesId
 * @param  {} validateUsersId
 * @param  {} validatefavRecipe
 * @param  {} favoriteRecipesController.favoriteRecipe
 */

app.post('/api/v1/users/:recipeId/recipes', authentication.isLoggedIn, validateRecipesId, validateUsersId, validatefavRecipe, favoriteRecipesController.favoriteRecipe);

/**
 * @param  {recipeId/recipes'} '/api/v1/users/
 * @param  {} authentication.isLoggedIn
 * @param  {} validateRecipesId
 * @param  {} validateUsersId
 * @param  {} favoriteRecipesController.recipeCategory
 */
app.put('/api/v1/users/:recipeId/recipes', authentication.isLoggedIn, validateRecipesId, validateUsersId, favoriteRecipesController.recipeCategory);

/** Get favorite recipes
 * @param  {userId/recipes'} '/api/v1/users/
 * @param  {} authentication.isLoggedIn
 * @param  {} validateUsersId
 * @param  {} favoriteRecipesController.getfavoriteRecipe
 */
app.get('/api/v1/users/:userId/recipes', authentication.isLoggedIn, validateParamUserId, favoriteRecipesController.getfavoriteRecipe);

/** Upvote recipe
 * @param  {recipeId'} '/api/v1/users/upvote/
 * @param  {} authentication.isLoggedIn
 * @param  {} validateRecipesId
 * @param  {} checkUserId
 * @param  {} validateUpVote
 * @param  {} recipesController.upvoteRecipe
 */
app.post('/api/v1/users/upvote/:recipeId', authentication.isLoggedIn, validateRecipesId, checkUserId, validateUpVote, recipesController.upvoteRecipe);

/** Downvote recipe
 * @param  {recipeId'} '/api/v1/users/downvote/
 * @param  {} authentication.isLoggedIn
 * @param  {} validateRecipesId
 * @param  {} checkUserId
 * @param  {} validateDownVote
 * @param  {} recipesController.downvoteRecipe
 */
app.post('/api/v1/users/downvote/:recipeId', authentication.isLoggedIn, validateRecipesId, checkUserId, validateDownVote, recipesController.downvoteRecipe);


export default app;
