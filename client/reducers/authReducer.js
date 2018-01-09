import { SET_CURRENT_USER, GET_USER, EDIT_PROFILE, SAVE_PROFILE_IMAGE } from '../actions/types';

const INITIAL_STATE = {
  userExist: '',
  user: {},
  userProfile: {},
  imageDetails: ''
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
const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_CURRENT_USER:
    return {
      ...state,
      user: action.user,
      authenticated: true
    };
  case SAVE_PROFILE_IMAGE:
    return {
      ...state,
      imageDetails: action.payload
    };
  case GET_USER:
    return {
      ...state,
      userProfile: action.user
    };
  case EDIT_PROFILE:
    return {
      ...state,
      userProfile: action.user.data
    };
  default:
    return state;
  }
};

export default authReducer;
