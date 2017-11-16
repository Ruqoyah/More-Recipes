import {
  GET_USER_RECIPES, GET_RECIPES, SEARCH_RECIPES, GET_FAVORITE_RECIPES, ADD_REVIEW,
  VIEW_RECIPE, GET_REVIEW, UPVOTE_RECIPE, DOWNVOTE_RECIPE, DELETE_RECIPE,
  EDIT_RECIPE, SAVE_RECIPE_IMAGE, VIEW_UPVOTE_RECIPE, VIEW_DOWNVOTE_RECIPE, ADD_RECIPE
} from '../Actions/Types';

const INITIAL_STATE = {
  userRecipe: [],
  recipes: [],
  favoriteRecipes: [],
  viewRecipe: {},
  reviews: [],
  upvotes: {},
  downvotes: {},
  imageDetails: {}
};

function recipeReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_USER_RECIPES:
      return { ...state, userRecipe: action.payload };
    case EDIT_RECIPE: {
      const newArr = [];
      state.userRecipe.map((obj) => { // eslint-disable-line
        if (obj.id === action.payload.id) {
          newArr.push(action.payload);
        } else {
          newArr.push(obj);
        }
      });
      return { ...state, userRecipe: newArr };
    }
    case DELETE_RECIPE: {
      const newState = state.userRecipe.filter(recipe =>
        (recipe.id !== action.id)
      );
      return { ...state, userRecipe: newState };
    }
    case GET_RECIPES:
      return { ...state, recipes: action.payload };
    case ADD_RECIPE:
      return { ...state, recipes: [...state.recipes, action.payload.data] };
    case SEARCH_RECIPES:
      return { ...state, recipes: action.payload.data };
    case GET_FAVORITE_RECIPES:
      return { ...state, favoriteRecipes: action.payload };
    case VIEW_RECIPE:
      return { ...state, viewRecipe: action.payload };
    case ADD_REVIEW:
      return { ...state, reviews: [...state.reviews, action.payload] };
    case GET_REVIEW:
      return { ...state, reviews: action.payload };
    case SAVE_RECIPE_IMAGE:
      return { ...state, imageDetails: action.payload };
    case UPVOTE_RECIPE: {
      const newArr = [];
      state.recipes.map((obj) => { // eslint-disable-line
        if (obj.id === action.payload.data.id) {
          newArr.push(action.payload.data);
        } else {
          newArr.push(obj);
        }
      });
      return { ...state, recipes: newArr };
    }
    case DOWNVOTE_RECIPE: {
      const newArr = [];
      state.recipes.map((obj) => { // eslint-disable-line
        if (obj.id === action.payload.data.id) {
          newArr.push(action.payload.data);
        } else {
          newArr.push(obj);
        }
      });
      return { ...state, recipes: newArr };
    }
    case VIEW_UPVOTE_RECIPE:
      return { ...state, viewRecipe: action.payload.data };
    case VIEW_DOWNVOTE_RECIPE:
      return { ...state, viewRecipe: action.payload.data };
    default:
      return state;
  }
}

export default recipeReducer;
