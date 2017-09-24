import axios from 'axios';
import winston from 'winston';

const API_URL = 'https://more-recipes-app.herokuapp.com';

export default function signUpAction(userDetails) {
  axios.post(`${API_URL}/api/v1/users/signup`, userDetails)
    .then(res => winston.info(res))
    .catch(error => winston.info(error));
}
