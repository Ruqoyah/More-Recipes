
const authenticateUser = () => {
  const check = localStorage.getItem('token'); //eslint-disable-line
  if (check) return true;
  return false;
};

export default authenticateUser;

