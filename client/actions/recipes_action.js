import axios from 'axios';
import { GET_USER_RECIPES, GET_RECIPES, SEARCH_RECIPES, GET_FAVORITE_RECIPES,
  UPVOTE_RECIPE, DOWNVOTE_RECIPE } from './types';

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

export function viewRecipeAction(recipeId) {
  return axios.get(`${API_URL}/api/v1/recipes/${recipeId}`)
    .then(res => res.data)
    .catch(error => error.response.data);
}

export function reviewRecipeAction(recipeId, details) {
  return axios.get(`${API_URL}/api/v1/recipes/${recipeId}/reviews`, details)
    .then(res => res.data)
    .catch(error => error.response.data);
}

export function upvoteRecipeAction(recipeId, userId) {
  return dispatch => axios.post(`${API_URL}/api/v1/users/upvote/${recipeId}`, { userId })
    .then((res) => {
      dispatch({
        type: UPVOTE_RECIPE,
        upvotes: res.data
      });
    })
    .catch(error => error.response);
}

export function downvoteRecipeAction(recipeId, userId) {
  return dispatch => axios.post(`${API_URL}/api/v1/users/downvote/${recipeId}`, { userId })
    .then((res) => {
      dispatch({
        type: DOWNVOTE_RECIPE,
        downvotes: res.data
      });
    })
    .catch(error => error.response);
}
