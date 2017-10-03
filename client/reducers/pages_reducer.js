import { ADD_RECIPE, GET_USER_RECIPES } from '../actions/types';

const INITIAL_STATE = { userRecipe: '' };

function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_RECIPE:
      return { ...state };
    case GET_USER_RECIPES:
      return { ...state, userRecipe: action.userRecipe };
    default:
      return state;
  }
}

export default authReducer;
