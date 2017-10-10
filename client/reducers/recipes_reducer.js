import { GET_USER_RECIPES, GET_RECIPES, SEARCH_RECIPES, GET_FAVORITE_RECIPES, VIEW_RECIPES } from '../actions/types';

const INITIAL_STATE = { userRecipe: '', recipes: '', favoriteRecipes: '' };

function recipeReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_USER_RECIPES:
      return { ...state, userRecipe: action.userRecipe };
    case GET_RECIPES:
      return { ...state, recipes: action.recipes };
    case SEARCH_RECIPES:
      return { ...state, recipes: action.recipes.data };
    case GET_FAVORITE_RECIPES:
      return { ...state, favoriteRecipes: action.favoriteRecipes };
    default:
      return state;
  }
}

export default recipeReducer;
