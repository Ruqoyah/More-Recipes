import axios from 'axios';
import jwt from 'jsonwebtoken';
import { SET_CURRENT_USER, SAVE_PROFILE_IMAGE, GET_USER, EDIT_PROFILE } from './Types';
import { setAuthorizationToken } from '../Helper/index';

const API_URL = 'https://more-recipes-app.herokuapp.com';

/**
 * @description Request to the API to register a user
 *
 * @param  {object} userDetails the user deatils to be saved
 *
 * @return {object} dispatch object
 *
 */
export function signUpAction(userDetails) {
  return dispatch => axios.post(`${API_URL}/api/v1/users/signup`, userDetails)
    .then((res) => {
      const token = res.data.data.token;
      localStorage.setItem('token', res.data.data.token);
      setAuthorizationToken(token);
      dispatch({
        type: SET_CURRENT_USER,
        user: jwt.decode(token)
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
  return dispatch => axios.post(`${API_URL}/api/v1/users/signin`, userDetails)
    .then((res) => {
      const token = res.data.data.token;
      localStorage.setItem('token', res.data.data.token);
      setAuthorizationToken(token);
      dispatch({
        type: SET_CURRENT_USER,
        user: jwt.decode(token)
      });
      return res.data.status;
    })
    .catch(error => error.response.data.message);
}

/**
 * @description Request to the API to get user details
 *
 * @return {object} dispatch object
 *
 */
export function getUserProfileAction() {
  return dispatch => axios.get(`${API_URL}/api/v1/user`)
    .then((res) => {
      dispatch({
        type: GET_USER,
        user: res.data
      });
    })
    .catch(error => Promise.reject(error.response.data.message));
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
  return dispatch => axios.put(`${API_URL}/api/v1/user`, userDetails)
    .then((res) => {
      dispatch({
        type: EDIT_PROFILE,
        user: res.data.data
      });
      return res.data.message;
    })
    .catch(error => Promise.reject(error.response.data.message));
}
