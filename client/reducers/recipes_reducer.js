import { GET_USER_RECIPES, GET_RECIPES, SEARCH_RECIPES, FAVORITE_RECIPE } from '../actions/types';

const INITIAL_STATE = { userRecipe: '', recipes: '' };

function recipeReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_USER_RECIPES:
      return { ...state, userRecipe: action.userRecipe };
    case GET_RECIPES:
      return { ...state, recipes: action.recipes };
    case SEARCH_RECIPES:
      return { ...state, recipes: action.recipes.data };
    case FAVORITE_RECIPE:
      console.log('cam here');
      return { ...state, recipes: action.recipes };
    default:
      return state;
  }
}

export default recipeReducer;
