import React, { Component } from 'react';
import jwt from 'jsonwebtoken';
import { Route, Redirect } from 'react-router-dom';
import Authenticate from '../Include/Authenticate';
import UserRecipes from './UserRecipes';
import FavoriteRecipes from './FavoriteRecipes';
import ProfilePage from './ProfilePage';
import ViewRecipe from './ViewRecipe';
import AllRecipes from './AllRecipes';
import AddRecipe from './AddRecipe';

/**
 * @class UserPages
 *
 * @classdesc export middleware class to authenticate users
 *
 */
class UserPages extends Component {
  /**
   * constructor - contains the constructor
   *
   * @param  {object} props the properties of the class component
   *
   * @return {void} no return or void
   *
   */
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    };
  }

  /**
   * @description - checks if user is signed in or not
   *
   * @param  {object} event the event for the content field
   *
   * @return {void} no return or void
   *
   */
  componentWillMount() {
    const token = localStorage.getItem('token');
    jwt.verify(token, process.env.SUPER_SECRET, (error) => {
      if (error) {
        this.setState({
          authenticated: false
        });
      }
    });
    if (Authenticate()) {
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
   *
   * @return {object} returns an object
   *
   */
  render() {
    return (
      this.state.authenticated ?
        <div>
          <Route path="/user/myrecipe" render={() => <UserRecipes/>} />
          <Route path="/user/favoriterecipe" render={() => <FavoriteRecipes/>} />
          <Route path="/user/profilepage" render={() => <ProfilePage/>} />
          <Route path="/user/viewrecipe" render={() => <ViewRecipe/>} />
          <Route path="/user/addrecipe" render={() => <AddRecipe/>} />
          <Route path="/user/recipes" render={() => <AllRecipes/>} />
        </div> :
        <Redirect to = "/login"/>
    );
  }
}

export default UserPages;
