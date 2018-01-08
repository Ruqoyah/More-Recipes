import { combineReducers } from 'redux';
import AuthReducer from './authReducer';
import RecipeReducer from './recipesReducer';


/**
 * root reducer - contains all the reducers
 *
 * @param  {object} state the initial state
 *
 * @param  {object} action the action
 *
 */
const reducers = combineReducers({
  auth: AuthReducer,
  recipe: RecipeReducer
});

export default reducers;
