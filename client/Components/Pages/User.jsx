import React, { Component } from 'react';
import Authenticate from '../Include/Authenticate';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import MyRecipe from './MyRecipe';
import FavoriteRecipe from './FavoriteRecipe';
import ProfilePage from './ProfilePage';
import ViewRecipe from './ViewRecipe';
import RecipePage from './RecipePage';


/**
 * @class userPages
 * @classdesc export middleware class to authenticate users
 */
class UserPages extends Component {
  /**
   * 
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    };
  }

  componentWillMount() {
    if(Authenticate()) {
      this.setState({ authenticated: true });
    } else {
      this.setState({ authenticated: false });
    }
  }

  render() {
    return (
        this.state.authenticated
      ? 
      <div>
        <Route path='/user/myrecipe' render={() => <MyRecipe/>} />
        <Route path='/user/favoriterecipe' render={() => <FavoriteRecipe/>} />
        <Route path='/user/profilepage' render={() => <ProfilePage/>} />
        <Route path='/user/viewrecipe' render={() => <ViewRecipe/>} />
        <Route path='/user/recipe' render={() => <RecipePage/>} />
      </div>
      : 
      <Redirect to = "/login"/>
    );
  }
}

export default UserPages;
