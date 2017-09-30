import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export default class ViewRecipe extends Component {

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
        <div className="view-recipe">
          <div class="container">
            <h2>Strawberry</h2> <hr />
            <img src="images/strawberries and steak.png" className="img-thumbnail" alt="strawberry"
              width="700" /> <hr />
            <h4>Ingredients</h4>
            <p>Flour, water, pepper and onion</p><hr />
            <h4>Details</h4>
            <p>A fun salad that kids, and just about everyone else, will love. Fruit cocktail,
              grapes, mandarin oranges, whipped topping and mini marshmallows, are stirred together
              and chilled. Serves eight
            </p>
            <div className="chatlogs">
              <div className="chat friend">
                <div className="user-photo"><img src="images/picture.png" /></div>
                <p className="chat-message">Nice post..!!</p>
              </div>
              <div className="chat friend">
                <div className="user-photo"><img src="images/picture.png" /></div>
                <p className="chat-message">Nice one....</p>
              </div>
              <div className="chat self">
                <div className="user-photo"> <img src="images/picture.png" /></div>
                <p className="chat-message">Thanks all</p>
              </div>
              <div className="chat friend">
                <div className="user-photo"><img src="images/picture.png" /></div>
                <p className="chat-message">Great post</p>
              </div>
              <div className="add-style">
                <a href="#">View more</a>
              </div>
            </div>
            <div className="post-form">
              <textarea></textarea>
            </div>
          </div>
          <div className="input-group">
            <a href="#" className="btn btn-outline-primary active">Post Review</a>
            <span className="downvote"><img src="images/downvote.png" width="30" height="30"
              alt="downvote" /> </span>
            <span className="upvote"><img src="images/upvote.png" width="30" height="30"
              alt="upvote" /> </span>
            <span className="favorite"><img src="images/favorite.png" width="30" height="30"
              alt="favorite" /> </span>
          </div>
        </div>
      </div>);
  }
}
