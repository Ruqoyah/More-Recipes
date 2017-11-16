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
 * @class UserPages
 * @classdesc export middleware class to authenticate users
 */
class UserPages extends Component {
  /**
   * constructor - contains the constructor
   * @param  {object} props the properties of the class component
   * @return {void} no return or void
   */
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    };
  }

  /**
   * @description - checks if user is signed in or not
   * @param  {object} event the event for the content field
   * @return {void} no return or void
   */
  componentWillMount() {
    if(Authenticate()) {
      this.setState({ 
        authenticated: true 
      });
    } else {
      this.setState({ 
        authenticated: false 
      });
    }
  }

  /**
   * @description render - renders the class component
   * @return {object} returns an object
   */
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
