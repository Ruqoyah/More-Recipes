import axios from 'axios';
import jsonwebtoken from 'jsonwebtoken';
import {
  SET_CURRENT_USER,
  SAVE_PROFILE_IMAGE,
  GET_USER,
  EDIT_PROFILE,
  UNAUTH_USER
} from './types';
import { setAuthorizationToken } from '../helper';

/**
 * @description Request to the API to register a user
 *
 * @param  {object} userDetails the user deatils to be saved
 *
 * @return {object} dispatch object
 *
 */
export function signUpAction(userDetails) {
  return dispatch => axios.post('/api/v1/users/signup', userDetails)
    .then((res) => {
      const token = res.data.data.token;
      localStorage.setItem('token', res.data.data.token);
      setAuthorizationToken(token);
      dispatch({
        type: SET_CURRENT_USER,
        user: jsonwebtoken.decode(token)
      });
    })
    .catch(error => error.response.data);
}

/**
 * @description Request to the API to login user
 *
 * @param  {object} userDetails the user deatils to be saved
 *
 * @return {object} dispatch object
 *
 */
export function loginAction(userDetails) {
  return dispatch => axios.post('/api/v1/users/signin', userDetails)
    .then((res) => {
      const token = res.data.data.token;
      localStorage.setItem('token', res.data.data.token);
      setAuthorizationToken(token);
      dispatch({
        type: SET_CURRENT_USER,
        user: jsonwebtoken.decode(token)
      });
      return res.data.message;
    })
    .catch(error => Promise.reject(error.response.data.message));
}

/**
 * @description Request to the API to get user details
 *
 * @return {object} dispatch object
 *
 */
export function getUserProfileAction() {
  return dispatch => axios.get('/api/v1/user')
    .then((res) => {
      dispatch({
        type: GET_USER,
        user: res.data
      });
    })
    .catch(error => Promise.reject(error.response.data.message));
}

/**
 * @description Request to logout user
 *
 * @return {object} dispatch object
 *
 */
export function logoutAction() {
  return (dispatch) => {
    localStorage.removeItem('token');
    setAuthorizationToken(false);
    window.location.href = '/';
    dispatch({
      type: UNAUTH_USER,
      user: { currentUser: {} },
      authenticated: false
    });
  };
}

/**
 * @description Save image
 *
 * @param  {object} response the response
 *
 * @return {object} dispatch object
 */
export function saveImage(response) {
  return {
    type: SAVE_PROFILE_IMAGE,
    payload: response
  };
}

/**
 * @description Request to save image to cloudinary
 *
 * @param  {object} image the image to be saved
 *
 * @return {object} dispatch object
 *
 */
export function saveProfileImage(image) {
  const request = process.env.REQUEST;
  const cloudPreset = process.env.CLOUD_PRESET;

  const newFormData = new FormData();
  newFormData.append('file', image);
  newFormData.append('upload_preset', cloudPreset);
  return dispatch => fetch(request, {
    method: 'POST',
    body: newFormData })
    .then((res) => res.json())
    .then((data) => {
      dispatch(saveImage(data.public_id));
    })
    .catch((error) => {
      throw (error);
    });
}

/**
 * @description Request to the API to edit user profile
 *
 * @param  {object} userDetails the user deatils to be saved
 *
 * @return {object} dispatch object
 */
export function editProfileAction(userDetails) {
  return dispatch => axios.put('/api/v1/user', userDetails)
    .then((res) => {
      dispatch({
        type: EDIT_PROFILE,
        user: res.data.data
      });
      return res.data.message;
    })
    .catch(error => Promise.reject(error.response.data.message));
}
