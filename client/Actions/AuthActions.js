import axios from 'axios';
import jwt from 'jsonwebtoken';
import { SET_CURRENT_USER, SAVE_PROFILE_IMAGE, GET_USER, EDIT_PROFILE } from './Types';
import { setAuthorizationToken } from '../Helper/index';

const API_URL = 'https://more-recipes-app.herokuapp.com';


export function signUpAction(userDetails) {
  return dispatch => axios.post(`${API_URL}/api/v1/users/signup`, userDetails)
    .then((res) => {
      const token = res.data.data.token;
      localStorage.setItem('token', res.data.data.token); // eslint-disable-line
      setAuthorizationToken(token);
      dispatch({
        type: SET_CURRENT_USER,
        user: jwt.decode(token)
      });
    })
    .catch(error => error.response.data);
}

export function loginAction(userDetails) {
  return dispatch => axios.post(`${API_URL}/api/v1/users/signin`, userDetails)
    .then((res) => {
      const token = res.data.data.token;
      localStorage.setItem('token', res.data.data.token); // eslint-disable-line
      setAuthorizationToken(token);
      dispatch({
        type: SET_CURRENT_USER,
        user: jwt.decode(token)
      });
      return res.data.status;
    })
    .catch(error => error.response.data.message);
}

export function getUserProfileAction(userId) {
  return dispatch => axios.get(`${API_URL}/api/v1/users/${userId}`)
    .then((res) => {
      dispatch({
        type: GET_USER,
        user: res.data
      });
    })
    .catch(error => error.response);
}

export function saveImage(response) {
  return {
    type: SAVE_PROFILE_IMAGE,
    payload: response
  };
}

export function saveProfileImage(image) {
  const request = 'https://api.cloudinary.com/v1_1/ruqoyah/upload/';
  const cloudPreset = 'amrbhh2u';

  const newFormData = new FormData(); // eslint-disable-line
  newFormData.append('file', image);
  newFormData.append('upload_preset', cloudPreset);
  return dispatch => fetch(request, { // eslint-disable-line
    method: 'POST',
    body: newFormData })
    .then((res) => { // eslint-disable-line
      return res.json();
    })
    .then((data) => {
      dispatch(saveImage(data.secure_url));
    })
    .catch((error) => {
      throw (error);
    });
}

export function editProfileAction(userId, userDetails) {
  return dispatch => axios.put(`${API_URL}/api/v1/user/${userId}`, userDetails)
    .then((res) => {
      dispatch({
        type: EDIT_PROFILE,
        user: res.data
      });
    })
    .catch(error => error.response);
}
