import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import RecipeReducer from './RecipesReducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  recipe: RecipeReducer

});

export default rootReducer;
