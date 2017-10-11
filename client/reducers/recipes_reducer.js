import { GET_USER_RECIPES, GET_RECIPES, SEARCH_RECIPES, GET_FAVORITE_RECIPES, GET_REVIEW, VIEW_RECIPE } from '../actions/types';

const INITIAL_STATE = { userRecipe: '', recipes: '', favoriteRecipes: '', reviews: '', viewRecipe: '' };

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
    case VIEW_RECIPE:
      return { ...state, viewRecipe: action.viewRecipe };
    case GET_REVIEW:
      return { ...state, reviews: action.reviews };
    default:
      return state;
  }
}

export default recipeReducer;
