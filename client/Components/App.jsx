import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from '../Components/Pages/Homepage';
import Signup from '../Components/Pages/Signup';
import Login from '../Components/Pages/Login';
import RecipePage from '../Components/Pages/RecipePage';
import PageNotFound from '../Components/PageNotFound/PageNotFound';
import AddRecipe from '../Components/Pages/AddRecipe';
import FavoriteRecipe from '../Components/Pages/FavoriteRecipe';
import ProfilePage from '../Components/Pages/ProfilePage';
import ViewRecipe from '../Components/Pages/ViewRecipe';


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
