import axios from 'axios';
import { GET_USER_RECIPES, GET_RECIPES, SEARCH_RECIPES, GET_FAVORITE_RECIPES,
  ADD_REVIEW, VIEW_RECIPE, VIEW_FAVORITE, GET_REVIEW, DOWNVOTE_RECIPE,
  EDIT_RECIPE } from './types';

const API_URL = 'http://localhost:8000';

export function addRecipeAction(recipeDetails) {
  return axios.post(`${API_URL}/api/v1/recipes`, recipeDetails);
}

export function getUserRecipeAction(userId) {
  return dispatch => axios.get(`${API_URL}/api/v1/${userId}/recipes`)
    .then((res) => {
      dispatch({
        type: GET_USER_RECIPES,
        userRecipe: res.data
      });
    })
    .catch(error => error.response);
}

export function getAllRecipeAction() {
  return dispatch => axios.get(`${API_URL}/api/v1/recipes`)
    .then((res) => {
      dispatch({
        type: GET_RECIPES,
        recipes: res.data
      });
    })
    .catch(error => error.response);
}

export function searchRecipesAction(search) {
  return dispatch => axios.get(`${API_URL}/api/v1/recipes?search=${search}`)
    .then((res) => {
      dispatch({
        type: SEARCH_RECIPES,
        recipes: res.data
      });
    })
    .catch(error => error.response);
}

export function favoriteAction(recipeId, userId) {
  return axios.post(`${API_URL}/api/v1/users/${recipeId}/recipes`, { userId })
    .then(res => res.data.status)
    .catch(error => error.response.data.status);
}

export function getFavoriteAction(userId) {
  return dispatch => axios.get(`${API_URL}/api/v1/users/${userId}/recipes`)
    .then((res) => {
      dispatch({
        type: GET_FAVORITE_RECIPES,
        favoriteRecipes: res.data
      });
    })
    .catch(error => error.response);
}

export function upvoteRecipeAction(recipeId, userId) {
  return dispatch => axios.post(`${API_URL}/api/v1/users/upvote/${recipeId}`, { userId })
    .then(() => {
      dispatch(getAllRecipeAction());
    })
    .catch(error => error.response);
}

export function downvoteRecipeAction(recipeId, userId) {
  return dispatch => axios.post(`${API_URL}/api/v1/users/downvote/${recipeId}`, { userId })
    .then(() => {
      dispatch(getAllRecipeAction());
    })
    .catch(error => error.response);
}

export function viewRecipeAction(recipeId) {
  return dispatch => axios.get(`${API_URL}/api/v1/recipes/${recipeId}`)
    .then((res) => {
      dispatch({
        type: VIEW_RECIPE,
        viewRecipe: res.data
      });
    })
    .catch(error => error.response);
}

export function reviewRecipeAction(recipeId, details) {
  return dispatch => axios.post(`${API_URL}/api/v1/recipes/${recipeId}/reviews`, details)
    .then((res) => {
      dispatch({
        type: ADD_REVIEW,
        reviews: res.data.data
      });
    })
    .catch(error => error.response);
}

export function getReviewAction(recipeId) {
  return dispatch => axios.get(`${API_URL}/api/v1/recipes/${recipeId}/reviews`)
    .then((res) => {
      dispatch({
        type: GET_REVIEW,
        reviews: res.data
      });
    })
    .catch(error => error.response);
}

export function viewFavoriteAction(recipeId) {
  return dispatch => axios.get(`${API_URL}/api/v1/favorite/${recipeId}/recipes`)
    .then((res) => {
      dispatch({
        type: VIEW_FAVORITE,
        viewFavorite: res.data
      });
    })
    .catch(error => error.response);
}

export function deleteRecipeAction(recipeId, userId) {
  return axios.delete(`${API_URL}/api/v1/recipes/${recipeId}`, userId)
    .then(res => res.data)
    .catch(error => error.response);
}

export function editRecipeAction(recipeId, editRecipes) {
  return dispatch => axios.put(`${API_URL}/api/v1/recipes/${recipeId}`, editRecipes)
    .then((res) => {
      dispatch({
        type: EDIT_RECIPE,
        user: res.data
      });
    })
    .catch(error => error.response);
}
