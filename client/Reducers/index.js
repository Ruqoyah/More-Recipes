import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import RecipeReducer from './RecipesReducer';


/**
 * root reducer - contains all the reducers
 *
 * @param  {object} state the initial state
 *
 * @param  {object} action the action
 *
 */
const rootReducer = combineReducers({
  auth: AuthReducer,
  recipe: RecipeReducer
});

export default rootReducer;
