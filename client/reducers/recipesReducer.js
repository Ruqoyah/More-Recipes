import {
  GET_USER_RECIPES,
  GET_RECIPES,
  SEARCH_RECIPES,
  GET_FAVORITE_RECIPES,
  ADD_REVIEW,
  VIEW_RECIPE,
  GET_REVIEW,
  UPVOTE_RECIPE,
  DOWNVOTE_RECIPE,
  DELETE_RECIPE,
  EDIT_RECIPE,
  SAVE_RECIPE_IMAGE,
  LOAD_MORE_REVIEWS
} from '../actions/types';

const INITIAL_STATE = {
  userRecipes: [],
  recipes: [],
  count: 0,
  reviewCount: 0,
  favoriteRecipes: [],
  viewRecipe: {},
  reviews: [],
  imageDetails: '',
  error: ''
};

  /**
   * reducer - contains the reducer
   *
   * @param  {object} state the initial state
   *
   * @param  {object} action the action
   *
   * @return {Object} returns an Object
   *
   */
const recipeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_USER_RECIPES:
    return { ...state,
      userRecipes: action.payload.recipes.rows,
      count: action.payload.recipes.count };
  case EDIT_RECIPE: {
    const newArr = [];
    state.userRecipes.map((obj) => { //eslint-disable-line
      if (obj.id === action.payload.id) {
        newArr.push(action.payload);
      } else {
        newArr.push(obj);
      }
    });
    return { ...state, userRecipes: newArr };
  }
  case DELETE_RECIPE: {
    const newState = state.userRecipes.filter(recipe =>
      (recipe.id !== action.id)
    );
    return { ...state, userRecipes: newState };
  }
  case GET_RECIPES:
    return { ...state,
      recipes: action.payload.recipes.rows,
      count: action.payload.recipes.count };
  case SEARCH_RECIPES:
    return { ...state, recipes: action.payload.data, error: action.payload.data.message };
  case GET_FAVORITE_RECIPES:
    return { ...state,
      favoriteRecipes: action.payload.favoriteRecipes.rows,
      count: action.payload.favoriteRecipes.count };
  case VIEW_RECIPE:
    return { ...state, viewRecipe: action.payload };
  case ADD_REVIEW:
    return { ...state, reviews: [...state.reviews, action.payload.data] };
  case GET_REVIEW:
    return { ...state,
      reviews: action.payload.reviews.rows,
      reviewCount: action.payload.reviews.count };
  case LOAD_MORE_REVIEWS: {
    const count = action.payload.reviews.count - state.reviews.length;

    const newReviews = state.reviews.concat(action.payload.reviews.rows);
    return { ...state,
      reviews: newReviews,
      reviewCount: count
    };
  }
  case SAVE_RECIPE_IMAGE:
    return { ...state, imageDetails: action.payload };
  case UPVOTE_RECIPE:
    return {
      ...state,
      ...{
        recipes: [...state.recipes.map((recipe) => {
          if (recipe.id === action.payload.data.id) {
            recipe = action.payload.data;
          }
          return recipe;
        }
        )],
        favoriteRecipes: [...state.favoriteRecipes.map((recipe) => {
          if (recipe.recipeId === action.payload.data.id) {
            const updatedRecipe = {
              ...recipe.Recipe,
              upvotes: action.payload.data.upvotes,
              downvotes: action.payload.data.downvotes
            };
            recipe.Recipe = updatedRecipe;
          }
          return recipe;
        }
        )],
        viewRecipe: action.payload.data
      }
    };
  case DOWNVOTE_RECIPE:
    return {
      ...state,
      ...{
        recipes: [...state.recipes.map((recipe) => {
          if (recipe.id === action.payload.data.id) {
            recipe = action.payload.data;
          }
          return recipe;
        }
        )],
        favoriteRecipes: [...state.favoriteRecipes.map((recipe) => {
          if (recipe.recipeId === action.payload.data.id) {
            const updatedRecipe = {
              ...recipe.Recipe,
              upvotes: action.payload.data.upvotes,
              downvotes: action.payload.data.downvotes
            };
            recipe.Recipe = updatedRecipe;
          }
          return recipe;
        }
        )],
        viewRecipe: action.payload.data
      }
    };
  default:
    return state;
  }
};

export default recipeReducer;
