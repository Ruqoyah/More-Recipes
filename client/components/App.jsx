import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from '../components/Pages/Homepage';
import Signup from '../components/Pages/Signup';
import Login from '../components/Pages/Login';
import RecipePage from '../components/Pages/RecipePage';
import PageNotFound from '../components/PageNotFound/PageNotFound';
import AddRecipe from '../components/Pages/AddRecipe';
import FavoriteRecipe from '../components/Pages/FavoriteRecipe';
import ProfilePage from '../components/Pages/ProfilePage';
import ViewRecipe from '../components/Pages/ViewRecipe';


export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/login' component={Login} />
          <Route path='/recipe' component={RecipePage} />
          <Route path='/myrecipe' component={AddRecipe} />
          <Route path='/favoriterecipe' component={FavoriteRecipe} />
          <Route path='/profilepage' component={ProfilePage} />
          <Route path='/viewrecipe' component={ViewRecipe} />
          <Route path='*'component={PageNotFound} />
        </Switch>
        </div>
      </Router>
    );
  }
}
