import express from 'express';
import users from '../controllers/users';
import recipes from '../controllers/recipes';
import reviews from '../controllers/reviews';
import favoriteRecipes from '../controllers/favoriteRecipes';
import {
  validateRecipesId,
  checkRecipeInput,
  checkUserInput,
  checkValidUserInput,
  checkUserInvalidInput,
  checkReviewInvalidInput,
  validateUsers,
  validateLoginUser,
  checkReviewInput,
  validatefavRecipe,
  verifyEditUsername,
  verifyEditEmail,
  upVote,
  downVote,
  checkRecipeNameInvalidInput,
  checkRecipeIngredientInput,
  checkRecipeDetailsInput,
  validateUserId,
  checkParamInvalidInput,
  recipeExist,
  editProfilePassword,
  checkEditProfileInput,
  modifyRecipeExist
} from '../middleware/validation';
import authentication from '../middleware/authentication';


const app = express.Router();

/**
* @param  {string} '/api/v1/'
*
* @param  {object} req - request object
*
* @param  {object} res - response object
*/
app.get('/api/v1', (req, res) => {
  res.status(200)
    .json({
      status: true,
      message: "Welcome to More recipes API."
    });
});

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
 * @param  {} users.signup
 */
app.post(
  '/api/v1/users/signup',
  checkUserInput,
  checkValidUserInput,
  checkUserInvalidInput,
  validateUsers, users.signup
);

/** Signin
 *
 * @param  {} '/api/v1/users/signin'
 *
 * @param  {} validateLoginUser
 *
 * @param  {} users.signin
 */
app.post(
  '/api/v1/users/signin',
  validateLoginUser,
  users.signin
);

/** Get user
 *
 * @param  {} '/api/v1/user'
 *
 * @param  {} users.getUser
 *
 */
app.get(
  '/api/v1/users/profile',
  authentication.authenticate,
  users.getUser
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
 * @param  {} recipes.editProfile
 */
app.put(
  '/api/v1/users/profile',
  authentication.authenticate,
  checkEditProfileInput,
  editProfilePassword,
  verifyEditUsername,
  verifyEditEmail,
  users.editProfile
);

/** User Exist
 *
 * @param  {} '/api/v1/users/exist'
 *
 * @param  {} users.userExist
 *
 */
app.post(
  '/api/v1/users/exist',
  users.exist
);

/** Add recipe
 * @param  {} '/api/v1/recipes'
 *
 * @param  {} authentication.authenticate
 *
 * @param  {} checkRecipeInput
 *
 * @param  {} checkRecipeNameInvalidInput
 *
 * @param  {} validateUserId
 *
 * @param  {} recipes.addRecipe
 *
 */
app.post(
  '/api/v1/recipes',
  authentication.authenticate,
  checkRecipeInput,
  checkRecipeNameInvalidInput,
  checkRecipeIngredientInput,
  checkRecipeDetailsInput,
  validateUserId,
  recipeExist,
  recipes.addRecipe
);

/** Get User recipes
 *
 * @param  {} '/api/v1/user/recipes'
 *
 * @param  {} authentication.authenticate
 *
 * @param  {} recipes.getUserRecipes
 *
 */
app.get(
  '/api/v1/users/recipes',
  authentication.authenticate,
  recipes.getUserRecipes
);

/** Get all recipes
 *
 * @param  {} '/api/v1/recipes'
 *
 * @param  {} authentication.authenticate
 *
 * @param  {} recipes.searchRecipes
 *
 * @param  {} recipes.sortRecipes
 *
 * @param  {} recipes.getAllRecipes
 *
 */
app.get(
  '/api/v1/recipes',
  authentication.authenticate,
  recipes.searchRecipes,
  recipes.sortRecipes,
  recipes.getAllRecipes
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
 * @param  {} recipes.modifyRecipe
 */
app.put(
  '/api/v1/recipes/:recipeId',
  authentication.authenticate,
  checkParamInvalidInput,
  validateRecipesId,
  checkRecipeNameInvalidInput,
  checkRecipeIngredientInput,
  checkRecipeDetailsInput,
  modifyRecipeExist,
  recipes.modifyRecipe
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
 * @param  {} recipes.viewRecipe
 *
 */
app.get(
  '/api/v1/recipes/:recipeId',
  authentication.authenticate,
  checkParamInvalidInput,
  validateRecipesId,
  recipes.viewRecipe
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
 * @param  {} recipes.deleteRecipe
 *
 */
app.delete(
  '/api/v1/recipes/:recipeId',
  authentication.authenticate,
  checkParamInvalidInput,
  validateRecipesId,
  recipes.deleteRecipe
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
 * @param  {} reviews.postReview
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
  reviews.postReview
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
 * @param  {} reviews.getReviews
 *
 */
app.get(
  '/api/v1/recipes/:recipeId/reviews',
  authentication.authenticate,
  checkParamInvalidInput,
  validateRecipesId,
  reviews.getReviews
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
 * @param  {} favoriteRecipes.favoriteRecipe
 *
 */
app.post(
  '/api/v1/recipes/:recipeId/favorite',
  authentication.authenticate,
  checkParamInvalidInput,
  validateRecipesId,
  validateUserId,
  validatefavRecipe,
  favoriteRecipes.favoriteRecipe
);

/** Get favorite recipes
 *
 * @param  {} '/api/v1/users/recipes'
 *
 * @param  {} authentication.authenticate
 *
 * @param  {} favoriteRecipes.getfavoriteRecipe
 *
 */
app.get(
  '/api/v1/users/recipes/favorite',
  authentication.authenticate,
  favoriteRecipes.getfavoriteRecipe
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
 * @param  {} recipes.upvoteRecipe
 *
 */
app.post(
  '/api/v1/recipes/:recipeId/upvote',
  authentication.authenticate,
  checkParamInvalidInput,
  validateRecipesId,
  upVote,
  validateUserId,
  recipes.upVoteRecipe
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
 * @param  {} recipes.downvoteRecipe
 *
 */
app.post(
  '/api/v1/recipes/:recipeId/downvote',
  authentication.authenticate,
  checkParamInvalidInput,
  validateRecipesId,
  downVote,
  validateUserId,
  recipes.downVoteRecipe
);


export default app;
