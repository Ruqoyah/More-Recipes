import axios from 'axios';
import { SET_CURRENT_USER, LOG_USER } from './types';

const API_URL = 'http://localhost:8000';

export function signUpAction(userDetails) {
  return dispatch => axios.post(`${API_URL}/api/v1/users/signup`, userDetails)
    .then((res) => {
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
      dispatch({
        type: LOG_USER,
        user: res.data.token
      });
    })
    .catch(error => error.response.data);
}
