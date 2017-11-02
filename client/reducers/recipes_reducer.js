import { GET_USER_RECIPES, GET_RECIPES, SEARCH_RECIPES, GET_FAVORITE_RECIPES,
  UPVOTE_RECIPE, DOWNVOTE_RECIPE } from '../actions/types';

const INITIAL_STATE = {
  userRecipe: '',
  recipes: [],
  favoriteRecipes: '',
  upvotes: {},
  downvotes: {}
};

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
    case UPVOTE_RECIPE: {
      const newArr = [];
      state.recipes.map((obj) => { // eslint-disable-line
        if (obj.id === action.upvotes.data.id) {
          newArr.push(action.upvotes.data);
        } else {
          newArr.push(obj);
        }
      });
      return { ...state, recipes: newArr };
    }
    case DOWNVOTE_RECIPE: {
      const newArr = [];
      state.recipes.map((obj) => { // eslint-disable-line
        if (obj.id === action.downvotes.data.id) {
          newArr.push(action.downvotes.data);
        } else {
          newArr.push(obj);
        }
      });
      return { ...state, recipes: newArr };
    }
    default:
      return state;
  }
}

export default recipeReducer;
