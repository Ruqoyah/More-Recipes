import { combineReducers } from 'redux';
import authReducer from './authReducer';
import recipeReducer from './recipesReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  recipe: recipeReducer

});

export default rootReducer;
