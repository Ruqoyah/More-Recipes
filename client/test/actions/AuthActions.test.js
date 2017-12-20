import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import jwt from 'jsonwebtoken';
import mockData from '../_mocks_/mockData';
import mockLocalStorage from '../_mocks_/mockLocalStorage';
import { signUpAction, getUserProfileAction, editProfileAction } from '../../actions/authActions';
import { SET_CURRENT_USER, GET_USER, EDIT_PROFILE } from '../../actions/types';

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);

window.localStorage = mockLocalStorage;

describe('Auth actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('creates SET_CURRENT_USER when signup action is successful', async (done) => {
    const { authResponse, signupData } = mockData;
    moxios.stubRequest('/api/v1/users/signup', {
      status: 201,
      response: authResponse
    });
    const expectedActions = [{ type: SET_CURRENT_USER,
      user: jwt.decode(authResponse.data.token) }];
    const store = mockStore({});
    await store.dispatch(signUpAction(signupData))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('creates SET_CURRENT_USER when login action is successful', async (done) => {
    const { authResponse, signinData } = mockData;
    moxios.stubRequest('/api/v1/users/signin', {
      status: 200,
      response: authResponse
    });
    const expectedActions = [{ type: SET_CURRENT_USER,
      user: jwt.decode(authResponse.data.token) }];
    const store = mockStore({});
    await store.dispatch(signUpAction(signinData))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('creates GET_USER when trying to get user details', async (done) => {
    const { getUserDetails } = mockData;
    moxios.stubRequest('/api/v1/user', {
      status: 200,
      response: getUserDetails
    });
    const expectedActions = [{ type: GET_USER, user: getUserDetails }];
    const store = mockStore({});
    await store.dispatch(getUserProfileAction())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('creates EDIT_PROFILE when trying to edit profile', async (done) => {
    const { userDetails, editedDetails } = mockData;
    moxios.stubRequest('/api/v1/user', {
      status: 200,
      response: editedDetails
    });
    const expectedActions = [{ type: EDIT_PROFILE, user: editedDetails }];
    const store = mockStore({});
    await store.dispatch(editProfileAction(userDetails))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
});
