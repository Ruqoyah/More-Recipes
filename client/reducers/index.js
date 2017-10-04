import { combineReducers } from 'redux';
import authReducer from './auth_reducer';
import recipeReducer from './recipes_reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  recipe: recipeReducer

});

export default rootReducer;
