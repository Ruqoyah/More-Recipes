import React, { Component } from 'react';
import { render } from 'react-dom';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchRecipesAction } from '../../Actions/RecipesActions';
import { logoutAction } from '../../Actions/AuthActions';
import AllRecipes from '../Include/AllRecipes';

class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchRecipes: ''
    }
    this.searchHandler = this.searchHandler.bind(this)
  }
  
  logout(e) {
    e.preventDefault();
    this.props.actions.logoutAction();
  }
  
  searchHandler(event){
    const searchText = event.target.value;
    this.setState({ searchRecipes: event.target.value})
    this.props.actions.searchRecipesAction(searchText);
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <NavLink className="navbar-brand" to="/recipe">
            <img src="images/logo.png" width="270" height="59" alt="logo" />
          </NavLink>
          <button className="navbar-toggler" type="button" data-toggle="collapse"
            data-target="#navbarNav" aria-controls="navbarNav"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav col-lg-5">
            { window.location.href.split('/').splice(-1).toString() === 'recipe' &&
              <input onChange={this.searchHandler} className="form-control mr-sm-2" type="text" 
              placeholder="Search recipe" aria-label="Search" />
            }  
            </ul>
          </div>
          <a className="navbar-brand" href="#"><img src="images/bell.png" width="32" height="33"
            alt="bell" /></a>
          <NavLink className="navbar-brand" to="/profilepage"><img src="images/picture.png"
            width="45" height="45" alt="picture" /></NavLink>
          <div className="dropdown">
            <button className="btn btn-light dropdown-toggle" type="button" id="dropdownMenu2"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Profile</button>
            <div className="dropdown-menu">
              <NavLink className="dropdown-item" to="/profilepage">View profile</NavLink>
              <NavLink className="dropdown-item" to="/myrecipe">My Recipes</NavLink>
              <NavLink className="dropdown-item" to="/favoriterecipe">Favorite Recipes</NavLink>
              <div className="dropdown-divider"></div>
              <a href= "#" onClick={this.logout.bind(this)} className="dropdown-item">Log out</a>
            </div>
          </div>
        </nav>
      </div>);
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      logoutAction,
      searchRecipesAction
    }, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Header);