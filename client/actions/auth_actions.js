import axios from 'axios';

const API_URL = 'https://more-recipes-app.herokuapp.com';

export default function signUpAction(userDetails) {
  axios.post(`${API_URL}/api/v1/users/signup`, userDetails)
    .then(res => console.log(res))
    .catch(error => console.log(error));
}
