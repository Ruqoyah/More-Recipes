import axios from 'axios';
import jwt from 'jsonwebtoken';
import { SET_CURRENT_USER, UNAUTH_USER } from './types';
import { setAuthorizationToken } from '../helper/index';

const API_URL = 'http://localhost:8000';

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

export function logoutAction() {
  return (dispatch) => {
    localStorage.removeItem('token');
    setAuthorizationToken(false);
    dispatch({
      type: UNAUTH_USER,
      user: {}
    });
    window.location.href = '/';
  };
}
