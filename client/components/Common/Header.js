import React, { Component } from 'react';
import { render } from 'react-dom';
import { NavLink } from 'react-router-dom';

export default class Header extends Component {

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
            <ul className="navbar-nav col-lg-6">
              <input className="form-control mr-sm-2" type="text" placeholder="Search recipe"
                aria-label="Search" />
            </ul>
          </div>
          <a className="navbar-brand" href="#"><img src="images/bell.png" width="32" height="33"
            alt="bell" /></a>
          <NavLink className="navbar-brand" to="/profilepage"><img src="images/picture.png"
            width="45" height="45" alt="picture" /></NavLink>
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Profile</button>
            <div className="dropdown-menu">
              <NavLink className="dropdown-item" to="/profilepage">View profile</NavLink>
              <NavLink className="dropdown-item" to="/addrecipe">My Recipes</NavLink>
              <NavLink className="dropdown-item" to="/favoriterecipe">Favorite Recipes</NavLink>
              <div className="dropdown-divider"></div>
              <NavLink className="dropdown-item" to="/">Log out</NavLink>
            </div>
          </div>
        </nav>
      </div>);
  }
}
