import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import jsonwebtoken from 'jsonwebtoken';
import mockData from '../_mocks_/mockData';
import mockLocalStorage from '../_mocks_/mockLocalStorage';
import {
  signUpAction,
  getUserProfileAction,
  editProfileAction,
  loginAction,
  logoutAction,
  saveProfileImage
} from '../../actions/authActions';
import {
  SET_CURRENT_USER,
  GET_USER,
  UNAUTH_USER,
  EDIT_PROFILE,
  SAVE_PROFILE_IMAGE
} from '../../actions/types';

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);

window.localStorage = mockLocalStorage;

describe('Auth actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('signup action creator', () => {
    it('creates SET_CURRENT_USER when signup action is successful',
      async (done) => {
        const { authResponse, signupData } = mockData;
        moxios.stubRequest('/api/v1/users/signup', {
          status: 201,
          response: authResponse
        });
        const expectedActions = [{ type: SET_CURRENT_USER,
          user: jsonwebtoken.decode(authResponse.data.token) }];
        const store = mockStore({});
        await store.dispatch(signUpAction(signupData))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
        done();
      });
  });

  describe('login action creator', () => {
    it('creates SET_CURRENT_USER when login action is successful',
      async (done) => {
        const { authResponse, signinData } = mockData;
        moxios.stubRequest('/api/v1/users/signin', {
          status: 200,
          response: authResponse
        });
        const expectedActions = [{ type: SET_CURRENT_USER,
          user: jsonwebtoken.decode(authResponse.data.token) }];
        const store = mockStore({});
        await store.dispatch(loginAction(signinData))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
        done();
      });
  });

  describe('get user profile action creator', () => {
    it('creates GET_USER when trying to get user details',
      async (done) => {
        const { getUserDetails } = mockData;
        moxios.stubRequest('/api/v1/users/profile', {
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
  });

  describe('logout action creator', () => {
    it('creates UNAUTH_USER when logout action is successful',
      async (done) => {
        const expectedActions = [{
          type: UNAUTH_USER,
          user: {
            currentUser: {}
          },
          authenticated: false }];

        const store = mockStore({});
        await store.dispatch(logoutAction());

        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  describe('edit profile action creator', () => {
    it('creates EDIT_PROFILE when trying to edit profile',
      async (done) => {
        const { userDetails, editedDetails } = mockData;
        moxios.stubRequest('/api/v1/users/profile', {
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

  describe('save image to cloudinary action creator', () => {
    it('creates SAVE_PROFILE_IMAGE when edit profile action is successful',
      async (done) => {
        process.env.REQUEST = 'https://api.cloudinary.com/v1_1/ruqoyah/upload';
        const request = process.env.REQUEST;
        const { imageResponse, uploadImage } = mockData;
        moxios.stubRequest(request, {
          status: 200,
          response: imageResponse
        });
        const expectedActions = [{
          type: SAVE_PROFILE_IMAGE,
          payload: imageResponse.public_id
        }];
        const store = mockStore({});
        await store.dispatch(saveProfileImage(uploadImage))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
        done();
      });
  });
});
