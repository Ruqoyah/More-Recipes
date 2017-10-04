import axios from 'axios';
import { SET_CURRENT_USER } from './types';

const API_URL = 'http://localhost:8000';

export function signUpAction(userDetails) {
  return dispatch => axios.post(`${API_URL}/api/v1/users/signup`, userDetails)
    .then((res) => {
      localStorage.setItem('token', res.data.data.token);
      dispatch({
        type: SET_CURRENT_USER,
        user: res.data.token
      });
    })
    .catch(error => error.response.data);
}

export function loginAction(userDetails) {
  return dispatch => axios.post(`${API_URL}/api/v1/users/signin`, userDetails)
    .then((res) => {
      localStorage.setItem('token', res.data.data.token);
      dispatch({
        type: SET_CURRENT_USER,
        user: res.data.token
      });
      return res.data.status;
    })
    .catch(error => error.response.data.message);
}
