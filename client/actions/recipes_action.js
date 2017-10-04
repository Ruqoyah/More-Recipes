import axios from 'axios';
import { GET_USER_RECIPES, GET_RECIPES } from './types';

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
