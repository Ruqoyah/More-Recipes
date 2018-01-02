import express from 'express';
import usersController from '../controllers/users';
import recipesController from '../controllers/recipes';
import reviewsController from '../controllers/reviews';
import favoriteRecipesController from '../controllers/favoriteRecipes';
import { validateRecipesId, checkRecipeInput,
  checkUserInput, checkValidUserInput, checkUserInvalidInput,
  checkReviewInvalidInput, validateUsers, validateLoginUser, checkReviewInput,
  validatefavRecipe, verifyEditUsername, verifyEditEmail, upVote, downVote,
  checkRecipeInvalidInput, validateUserId, checkParamInvalidInput,
  recipeExist, editProfilePassword, checkEditProfileInput } from '../middleware/validation';
import authentication from '../middleware/authentication';


const app = express.Router();

/** Signup
 * @param  {} '/api/v1/users/signup'
 *
 * @param  {} checkUserInput
 *
 * @param  {} checkValidUserInput
 *
 * @param  {} checkUserInvalidInput
 *
 * @param  {} validateUsers
 *
 * @param  {} usersController.signup
 */
app.post(
  '/api/v1/users/signup',
  checkUserInput,
  checkValidUserInput,
  checkUserInvalidInput,
  validateUsers, usersController.signup
);

/** Signin
 *
 * @param  {} '/api/v1/users/signin'
 *
 * @param  {} validateLoginUser
 *
 * @param  {} usersController.signin
 */
app.post(
  '/api/v1/users/signin',
  validateLoginUser,
  usersController.signin
);

/** Get user
 *
 * @param  {} '/api/v1/user'
 *
 * @param  {} usersController.getUser
 *
 */
app.get(
  '/api/v1/user',
  authentication.authenticate,
  usersController.getUser
);

/** Edit profile
 *
 * @param  {} '/api/v1/user'
 *
 * @param  {} authentication.authenticate
 *
 * @param  {} verifyEditUsername
 *
 * @param  {} verifyEditEmail
 *
 * @param  {} editProfilePassword
 *
 * @param  {} recipesController.editProfile
 */
app.put(
  '/api/v1/user',
  authentication.authenticate,
  checkEditProfileInput,
  editProfilePassword,
  verifyEditUsername,
  verifyEditEmail,
  usersController.editProfile
);

/** User Exist
 *
 * @param  {} '/api/v1/users/exist'
 *
 * @param  {} usersController.userExist
 *
 */
app.post(
  '/api/v1/users/exist',
  usersController.exist
);

/** Add recipe
 * @param  {} '/api/v1/recipes'
 *
 * @param  {} authentication.authenticate
 *
 * @param  {} checkRecipeInput
 *
 * @param  {} checkRecipeInvalidInput
 *
 * @param  {} validateUserId
 *
 * @param  {} recipesController.addRecipe
 *
 */
app.post(
  '/api/v1/recipes',
  authentication.authenticate,
  checkRecipeInput,
  checkRecipeInvalidInput,
  validateUserId,
  recipeExist,
  recipesController.addRecipe
);

/** Get User recipes
 *
 * @param  {} '/api/v1/user/recipes'
 *
 * @param  {} authentication.authenticate
 *
 * @param  {} recipesController.getUserRecipes
 *
 */
app.get(
  '/api/v1/user/recipes',
  authentication.authenticate,
  recipesController.getUserRecipes
);

/** Get all recipes
 *
 * @param  {} '/api/v1/recipes'
 *
 * @param  {} authentication.authenticate
 *
 * @param  {} recipesController.searchRecipes
 *
 * @param  {} recipesController.sortRecipes
 *
 * @param  {} recipesController.getAllRecipes
 *
 */
app.get(
  '/api/v1/recipes',
  authentication.authenticate,
  recipesController.searchRecipes,
  recipesController.sortRecipes,
  recipesController.getAllRecipes
);

/** Modify recipe
 *
 * @param  {recipeId'} '/api/v1/recipes/:recipeId'
 *
 * @param  {} authentication.authenticate
 *
 * @param  {} checkParamInvalidInput
 *
 * @param  {} validateRecipesId
 *
 * @param  {} recipesController.modifyRecipe
 */
app.put(
  '/api/v1/recipes/:recipeId',
  authentication.authenticate,
  checkParamInvalidInput,
  validateRecipesId,
  checkRecipeInvalidInput,
  recipesController.modifyRecipe
);

/** View Recipe
 * @param  {recipeId'} '/api/v1/recipes/:recipeId'
 *
 * @param  {} authentication.authenticate
 *
 * @param  {} checkParamInvalidInput
 *
 * @param  {} validateRecipesId
 *
 * @param  {} recipesController.viewRecipe
 *
 */
app.get(
  '/api/v1/recipes/:recipeId',
  authentication.authenticate,
  checkParamInvalidInput,
  validateRecipesId,
  recipesController.viewRecipe
);

/** Delete recipe
 *
 * @param  {recipeId'} '/api/v1/recipes/:recipeId'
 *
 * @param  {} authentication.authenticate
 *
 * @param  {} checkParamInvalidInput
 *
 * @param  {} validateRecipesId
 *
 * @param  {} recipesController.deleteRecipe
 *
 */
app.delete(
  '/api/v1/recipes/:recipeId',
  authentication.authenticate,
  checkParamInvalidInput,
  validateRecipesId,
  recipesController.deleteRecipe
);

/** Post review
 *
 * @param  {recipeId'} '/api/v1/recipes/:recipeId/reviews'
 *
 * @param  {} authentication.authenticate
 *
 * @param  {} checkParamInvalidInput
 *
 * @param  {} validateRecipesId
 *
 * @param  {} checkReviewInput
 *
 * @param  {} validateUserId
 *
 * @param  {} checkReviewInvalidInput
 *
 * @param  {} reviewsController.postReview
 *
 */
app.post(
  '/api/v1/recipes/:recipeId/reviews',
  authentication.authenticate,
  checkParamInvalidInput,
  validateRecipesId,
  checkReviewInput,
  validateUserId,
  checkReviewInvalidInput,
  reviewsController.postReview
);

/** Get reviews
 * @param  {recipeId'} '/api/v1/recipes/:recipeId/reviews'
 *
 * @param  {} authentication.authenticate
 *
 * @param  {} checkParamInvalidInput
 *
 * @param  {} validateRecipesId
 *
 * @param  {} reviewsController.getReviews
 *
 */
app.get(
  '/api/v1/recipes/:recipeId/reviews',
  authentication.authenticate,
  checkParamInvalidInput,
  validateRecipesId,
  reviewsController.getReviews
);

/** Add favorite recipe
 *
 * @param  {recipeId'} '/api/v1/users/:recipeId/recipes'
 *
 * @param  {} authentication.authenticate
 *
 * @param  {} checkParamInvalidInput
 *
 * @param  {} validateRecipesId
 *
 * @param  {} validateUserId
 *
 * @param  {} validatefavRecipe
 *
 * @param  {} favoriteRecipesController.favoriteRecipe
 *
 */
app.post(
  '/api/v1/users/:recipeId/recipes',
  authentication.authenticate,
  checkParamInvalidInput,
  validateRecipesId,
  validateUserId,
  validatefavRecipe,
  favoriteRecipesController.favoriteRecipe
);

/** Get favorite recipes
 *
 * @param  {} '/api/v1/users/recipes'
 *
 * @param  {} authentication.authenticate
 *
 * @param  {} favoriteRecipesController.getfavoriteRecipe
 *
 */
app.get(
  '/api/v1/users/recipes',
  authentication.authenticate,
  favoriteRecipesController.getfavoriteRecipe
);

/** Upvote recipe
 *
 * @param  {recipeId'} '/api/v1/users/upvote/:recipeId'
 *
 * @param  {} authentication.authenticate
 *
 * @param  {} checkParamInvalidInput
 *
 * @param  {} validateRecipesId
 *
 * @param  {} upVote
 *
 * @param  {} validateUserId
 *
 * @param  {} recipesController.upvoteRecipe
 *
 */
app.post(
  '/api/v1/users/upvote/:recipeId',
  authentication.authenticate,
  checkParamInvalidInput,
  validateRecipesId,
  upVote,
  validateUserId,
  recipesController.upVoteRecipe
);

/** Downvote recipe
 * @param  {recipeId'} '/api/v1/users/downvote/:recipeId'
 *
 * @param  {} authentication.authenticate
 *
 * @param  {} checkParamInvalidInput
 *
 * @param  {} validateRecipesId
 *
 * @param  {} downVote
 *
 * @param  {} validateUserId
 *
 * @param  {} recipesController.downvoteRecipe
 *
 */
app.post(
  '/api/v1/users/downvote/:recipeId',
  authentication.authenticate,
  checkParamInvalidInput,
  validateRecipesId,
  downVote,
  validateUserId,
  recipesController.downVoteRecipe
);


export default app;
