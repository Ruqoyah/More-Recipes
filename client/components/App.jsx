import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthenticateUser from '../components/middleware/AuthenticateUser';
import Homepage from '../components/pages/Homepage';
import Signup from '../components/pages/Signup';
import Login from '../components/pages/Login';
import PageNotFound from '../components/pageNotFound';
import UserRecipes from '../components/pages/UserRecipes';
import FavoriteRecipes from '../components/pages/FavoriteRecipes';
import ProfilePage from '../components/pages/ProfilePage';
import ViewRecipe from '../components/pages/ViewRecipe';
import AllRecipes from '../components/pages/AllRecipes';
import AddRecipe from '../components/pages/AddRecipe';

/**
 * @class App
 *
 * @classdesc route
 *
 */
export default class App extends Component {
  render() { // eslint-disable-line
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/my-recipe" component={AuthenticateUser(UserRecipes)} />
            <Route exact path="/favorite-recipe" component={AuthenticateUser(FavoriteRecipes)} />
            <Route exact path="/profile" component={AuthenticateUser(ProfilePage)} />
            <Route exact path="/recipes/:id" component={AuthenticateUser(ViewRecipe)} />
            <Route exact path="/add-recipe" component={AuthenticateUser(AddRecipe)} />
            <Route path="/recipes" component={AuthenticateUser(AllRecipes)} />
            <Route path="/*"component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}
