import {
  GET_USER_RECIPES, GET_RECIPES, SEARCH_RECIPES, GET_FAVORITE_RECIPES, ADD_REVIEW,
  VIEW_RECIPE, VIEW_FAVORITE, GET_REVIEW, UPVOTE_RECIPE, DOWNVOTE_RECIPE, DELETE_RECIPE,
  EDIT_RECIPE
} from '../actions/types';

const INITIAL_STATE = {
  userRecipe: [],
  recipes: [],
  favoriteRecipes: '',
  reviews: [],
  viewRecipe: '',
  viewFavorite: '',
  upvotes: {},
  downvotes: {}
};

function recipeReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_USER_RECIPES:
      return { ...state, userRecipe: action.userRecipe };
    case EDIT_RECIPE:
      return { ...state, userRecipe: action.userRecipe };
    case DELETE_RECIPE: {
      const newState = state.userRecipe.filter(recipe =>
        (recipe.id !== action.id)
      );
      return { ...state, userRecipe: newState };
    }
    case GET_RECIPES:
      return { ...state, recipes: action.recipes };
    case SEARCH_RECIPES:
      return { ...state, recipes: action.recipes.data };
    case GET_FAVORITE_RECIPES:
      return { ...state, favoriteRecipes: action.favoriteRecipes };
    case VIEW_RECIPE:
      return { ...state, viewRecipe: action.viewRecipe };
    case ADD_REVIEW:
      return { ...state, reviews: [...state.reviews, action.reviews] };
    case GET_REVIEW:
      return { ...state, reviews: action.reviews };
    case VIEW_FAVORITE:
      return { ...state, viewFavorite: action.viewFavorite };
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
