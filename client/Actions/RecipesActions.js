import axios from 'axios';
import { GET_USER_RECIPES, GET_RECIPES, SEARCH_RECIPES, GET_FAVORITE_RECIPES, UPVOTE_RECIPE,
  DOWNVOTE_RECIPE, ADD_REVIEW, VIEW_RECIPE, GET_REVIEW, EDIT_RECIPE,
  DELETE_RECIPE, SAVE_RECIPE_IMAGE, VIEW_UPVOTE_RECIPE, VIEW_DOWNVOTE_RECIPE,
  ADD_RECIPE } from './Types';

const API_URL = 'https://more-recipes-app.herokuapp.com';


export function saveImage(response) {
  return {
    type: SAVE_RECIPE_IMAGE,
    payload: response
  };
}

export function saveImageToCloud(image) {
  const request = 'https://api.cloudinary.com/v1_1/ruqoyah/upload/';
  const cloudPreset = 'amrbhh2u';

  const newFormData = new FormData(); // eslint-disable-line
  newFormData.append('file', image);
  newFormData.append('upload_preset', cloudPreset);
  return dispatch => fetch(request, { // eslint-disable-line
    method: 'POST',
    body: newFormData })
    .then((res) => { // eslint-disable-line
      return res.json();
    })
    .then((data) => {
      dispatch(saveImage(data.public_id));
    })
    .catch((error) => {
      throw (error);
    });
}

export function addRecipeAction(recipeDetails) {
  return dispatch => axios.post(`${API_URL}/api/v1/recipes`, recipeDetails)
    .then((res) => {
      dispatch({
        type: ADD_RECIPE,
        payload: res.data
      });
    })
    .catch(error => error.response);
}

export function getUserRecipeAction(userId) {
  return dispatch => axios.get(`${API_URL}/api/v1/${userId}/recipes`)
    .then((res) => {
      dispatch({
        type: GET_USER_RECIPES,
        payload: res.data
      });
    })
    .catch(error => error.response);
}

export function getAllRecipeAction() {
  return dispatch => axios.get(`${API_URL}/api/v1/recipes`)
    .then((res) => {
      dispatch({
        type: GET_RECIPES,
        payload: res.data
      });
    })
    .catch(error => error.response);
}

export function searchRecipesAction(search) {
  return dispatch => axios.get(`${API_URL}/api/v1/recipes?search=${search}`)
    .then((res) => {
      dispatch({
        type: SEARCH_RECIPES,
        payload: res.data
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
        payload: res.data
      });
    })
    .catch(error => error.response);
}

export function upvoteRecipeAction(recipeId, userId) {
  return dispatch => axios.post(`${API_URL}/api/v1/users/upvote/${recipeId}`, { userId })
    .then((res) => {
      dispatch({
        type: UPVOTE_RECIPE,
        payload: res.data
      });
    })
    .catch(error => error.response);
}

export function downvoteRecipeAction(recipeId, userId) {
  return dispatch => axios.post(`${API_URL}/api/v1/users/downvote/${recipeId}`, { userId })
    .then((res) => {
      dispatch({
        type: DOWNVOTE_RECIPE,
        payload: res.data
      });
    })
    .catch(error => error.response);
}

export function viewUpvoteAction(recipeId, userId) {
  return dispatch => axios.post(`${API_URL}/api/v1/users/upvote/${recipeId}`, { userId })
    .then((res) => {
      dispatch({
        type: VIEW_UPVOTE_RECIPE,
        payload: res.data
      });
    })
    .catch(error => error.response);
}

export function viewDownvoteAction(recipeId, userId) {
  return dispatch => axios.post(`${API_URL}/api/v1/users/downvote/${recipeId}`, { userId })
    .then((res) => {
      dispatch({
        type: VIEW_DOWNVOTE_RECIPE,
        payload: res.data
      });
    })
    .catch(error => error.response);
}

export function viewRecipeAction(recipeId) {
  return dispatch => axios.get(`${API_URL}/api/v1/recipes/${recipeId}`)
    .then((res) => {
      dispatch({
        type: VIEW_RECIPE,
        payload: res.data
      });
    })
    .catch(error => error.response);
}

export function reviewRecipeAction(recipeId, details) {
  return dispatch => axios.post(`${API_URL}/api/v1/recipes/${recipeId}/reviews`, details)
    .then((res) => {
      dispatch({
        type: ADD_REVIEW,
        payload: res.data.data
      });
    })
    .catch(error => error.response);
}

export function getReviewAction(recipeId) {
  return dispatch => axios.get(`${API_URL}/api/v1/recipes/${recipeId}/reviews`)
    .then((res) => {
      dispatch({
        type: GET_REVIEW,
        payload: res.data
      });
    })
    .catch(error => error.response);
}

export function deleteRecipeAction(recipeId, userId) {
  return dispatch => axios.delete(`${API_URL}/api/v1/recipes/${recipeId}`, userId)
    .then((res) => {
      dispatch({
        type: DELETE_RECIPE,
        id: Number(res.data.id)
      });
    })
    .catch(error => error.response);
}

export function editRecipeAction(recipeId, editRecipes) {
  return dispatch => axios.put(`${API_URL}/api/v1/recipes/${recipeId}`, editRecipes)
    .then((res) => {
      dispatch({
        type: EDIT_RECIPE,
        payload: res.data.data
      });
    })
    .catch(error => error.response);
}
