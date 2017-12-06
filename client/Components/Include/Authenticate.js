// Check if token is in the local storage
const authenticateUser = () => {
  const check = localStorage.getItem('token');
  if (check) return true;
  return false;
};

export default authenticateUser;

