import React, { Component } from 'react';
import PropTypes from "prop-types";
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  searchRecipesAction,
  getAllRecipeAction
} from '../../actions/recipesActions';
import { logoutAction } from '../../actions/authActions';

/**
 * @class Header
 *
 * @classdesc header component
 *
 */
export class Header extends Component {
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
      searchRecipes: ''
    };
    this.searchHandler = this.searchHandler.bind(this);
    this.logout = this.logout.bind(this);
  }

  /**
   * @description - handles logout click event
   *
   * @param  {object} event the event for the content field
   *
   * @return {void} no return or void
   */
  logout(event) {
    event.preventDefault();
    this.props.actions.logoutAction();
  }

  /**
   * @description - handles search recipes event
   *
   * @param  {object} event the event for the content field
   *
   * @return {void} no return or void
   *
   */
  searchHandler(event) {
    if (event.target.value.trim() !== '') {
      this.setState({ searchRecipes: event.target.value });
      this.props.actions.searchRecipesAction(event.target.value);
    } else {
      this.props.actions.getAllRecipeAction(1);
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
      <div>
        <nav
          className="navbar navbar-expand-lg navbar-light">
          <NavLink
            className="navbar-brand"
            to="/recipes">
            <img src="/images/recipe-logo.png"
              width="270"
              height="59"
              alt="logo"
            />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span
              className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarNav">
            <ul
              className="navbar-nav col-lg-5">
              { window.location.href.split('/').splice(-1).toString() === 'recipes' &&
              <input onChange={this.searchHandler}
                className="form-control mr-sm-2"
                type="text"
                placeholder="Search recipe"
                aria-label="Search" />
              }
            </ul>
          </div>
          {
            this.props.authenticated ?
              <div
                className="dropdown">

                <button className="btn btn-light dropdown-toggle"
                  type="button"
                  id="dropdownMenu2"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false">Profile
                </button>

                <div className="dropdown-menu">
                  <NavLink
                    className="dropdown-item"
                    to="/profile">View profile
                  </NavLink>
                  <NavLink
                    className="dropdown-item"
                    to="/my-recipe">My Recipes
                  </NavLink>
                  <NavLink
                    className="dropdown-item"
                    to="/favorite-recipe">Favorite Recipes
                  </NavLink>
                  <div className="dropdown-divider" />
                  <a
                    onClick={this.logout}
                    className="dropdown-item">Log out
                  </a>
                </div>
              </div> :
              null
          }
        </nav>
      </div>);
  }
}

/**
   * @description mapStateToProps - maps state value to props
   *
   * @param  {object} state the store state
   *
   * @return {Object} returns state object
   *
   */
function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

/**
 * @description mapDispatchToProps - maps dispatch to props value
 *
 * @param  {Function} dispatch dispatchs function
 *
 * @return {Object} returns an Object
 *
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      logoutAction,
      searchRecipesAction,
      getAllRecipeAction
    }, dispatch)
  };
}

Header.propTypes = {
  actions: PropTypes.object,
  authenticated: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
