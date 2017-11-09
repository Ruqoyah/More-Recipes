import { SET_CURRENT_USER, GET_USER, EDIT_PROFILE, SAVE_PROFILE_IMAGE } from '../Actions/Types';

const INITIAL_STATE = {
  userExist: '',
  user: '',
  userProfile: {
    fullName: '',
    username: '',
    email: '',
    picture: ''
  },
  imageDetails: ''
};

function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, user: action.user, authenticated: true };
    case SAVE_PROFILE_IMAGE:
      return { ...state, imageDetails: action.payload };
    case GET_USER:
      return { ...state, userProfile: action.user };
    case EDIT_PROFILE:
      return { ...state, userProfile: action.user };
    default:
      return state;
  }
}

export default authReducer;
