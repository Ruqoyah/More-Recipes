import React from 'react';
import { BrowserRouter as Router, Route, IndexRoute } from 'react-router-dom';
import App from '../components/App';
import Homepage from '../components/Homepage/Homepage';
import Signup from '../components/Signup/Signup';
import Login from '../components/Login/Login';
import RecipePage from '../components/RecipePage/RecipePage';


const routes = () => (
<Router>
  <Route path ="/" component={App}>
  <IndexRoute component={Homepage} />
  <Route path="signup" component={Signup} />
  <Route path="login" component={Login} />
  <Route path="recipe" component={RecipePage} />
  </Route>
</Router>
);
export default routes;
