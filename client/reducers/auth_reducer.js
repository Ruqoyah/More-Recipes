import { SET_CURRENT_USER } from '../actions/types';

const INITIAL_STATE = { userExist: '', error: '', message: '', user: '', content: '', authenticated: false };

function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, user: action.user, authenticated: true };
    default:
      return state;
  }
}

export default authReducer;
