import axios from 'axios';

/**
 * @description Request to the API to get user details
 *
 * @param  {string} username the username
 *
 * @return {object} dispatch object
 *
 */
export const userOrEmailExist = (username) => axios.post('/api/v1/users/exist', username)
  .then(res => res.data.status)
  .catch(error => error.response.data);

/**
 * @description Request to the API to get user details
 *
 * @param  {string} token the token set in the header
 *
 * @return {object} dispatch object
 *
 */
export const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization; // eslint-disable-line
  }
};

/**
 * @description A funtion that trim empty space
 *
 * @param  {string} firstInput the first input
 *
 * @param  {string} secondInput the second input
 *
 * @param  {string} thirdInput the third input
 *
 * @return {object} dispatch object
 *
 */
export const check = (firstInput, secondInput, thirdInput) => {
  if (firstInput.trim() === '' || secondInput.trim() === '' || thirdInput.trim() === '') {
    return true;
  }
  return false;
};

// toastr option
export const toastrOption = () => {
  toastr.options = {
    debug: false,
    timeOut: "2000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut"
  };
};
