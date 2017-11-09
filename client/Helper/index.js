import axios from 'axios';

export function userExist(username) {
  return axios.post('/api/v1/users/userexist', username)
    .then(res => res.data)
    .catch(error => error.response.data);
}

export function emailExist(email) {
  return axios.post('/api/v1/users/emailexist', email)
    .then(res => res.data)
    .catch(error => error.response.data);
}

export function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
}

