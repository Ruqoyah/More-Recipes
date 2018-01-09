import expect from 'expect';
import authReducer from '../../reducers/authReducer';
import {
  SET_CURRENT_USER,
  GET_USER,
  EDIT_PROFILE,
  SAVE_PROFILE_IMAGE
} from '../../actions/types';

describe('Auth Reducer', () => {
  it('should set the current user when passed with SET_CURRENT_USER', () => {
    const initialState = {
      user: {
        currentUser: { }
      }
    };
    const user = {
      currentUser: {
        username: 'ruqoyah',
        userId: 1
      }
    };
    const action = {
      type: SET_CURRENT_USER,
      user,
    };
    const newState = authReducer(initialState, action);
    expect(newState.authenticated).toEqual(true);
    expect(newState.user.currentUser.username).toEqual('ruqoyah');
    expect(newState.user.currentUser.userId).toEqual(1);
  });

  it('should return initial state for invalid action type', () => {
    const initialState = {
      authenticated: false,
      user: {
        currentUser: {
          username: '',
          id: 0
        }
      }
    };
    const user = {
      currentUser: {
        username: 'ruqoyah',
        id: 1
      }
    };
    const action = {
      type: 'TEST',
      user
    };
    const newState = authReducer(initialState, action);
    expect(newState.authenticated).toEqual(false);
    expect(newState.user.currentUser.username).toEqual('');
  });

  it('should get user details when passed with GET_USER', () => {
    const initialState = {
      userProfile: {}
    };
    const userProfile = {
      email: 'oriyomi@gmail.com',
      fullName: 'Rukayat Odukoya',
      id: 2,
      picture: null,
      status: true,
      username: 'rookie'
    };
    const action = {
      type: GET_USER,
      user: userProfile,
    };
    const newState = authReducer(initialState, action);
    expect(newState.userProfile.username).toEqual('rookie');
    expect(newState.userProfile.email).toEqual('oriyomi@gmail.com');
    expect(newState.userProfile.fullName).toEqual('Rukayat Odukoya');
    expect(newState.userProfile.picture).toEqual(null);
    expect(newState.userProfile.status).toEqual(true);
    expect(newState.userProfile.id).toEqual(2);
  });

  it('should save profile image when passed with SAVE_PROFILE_IMAGE', () => {
    const initialState = {
      imageDetails: ''
    };
    const imageDetails = 'k8sppk4v3048madldvyw';

    const action = {
      type: SAVE_PROFILE_IMAGE,
      payload: imageDetails,
    };
    const newState = authReducer(initialState, action);
    expect(newState.imageDetails).toEqual('k8sppk4v3048madldvyw');
  });

  it('should edit profile when passed with EDIT_PROFILE', () => {
    const initialState = {
      userProfile: {}
    };
    const userProfile = {
      data: {
        username: 'rookiey'
      }
    };
    const action = {
      type: EDIT_PROFILE,
      user: userProfile,
    };
    const newState = authReducer(initialState, action);
    expect(newState.userProfile.username).toEqual('rookiey');
  });
});
