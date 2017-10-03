import axios from 'axios';
import { ADD_RECIPE, GET_USER_RECIPES } from './types';

const API_URL = 'http://localhost:8000';

export function addRecipeAction(recipeDetails) {
  return dispatch => axios.post(`${API_URL}/api/v1/recipes`, recipeDetails)
    .then((res) => {
      dispatch({
        type: ADD_RECIPE,
        recipe: res.data
      });
      return console(res.data);
    })
    .catch(error => error.response.data.message);
}

export function getUserRecipeAction(recipeDetails) {
  return dispatch => axios.get(`${API_URL}/api/v1/:userId/recipes`, recipeDetails)
    .then((res) => {
      dispatch({
        type: GET_USER_RECIPES,
        userRecipe: res.data
      });
      return console.log('get =======> ', res.data);
    })
    .catch(error => error.response.data.message);
}
