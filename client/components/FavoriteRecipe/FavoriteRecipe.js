import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export default class FavoriteRecipe extends Component {

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
        <div className="card-deck">
          <div className="card">
            <img className="card-img-top" src="images/strawberries and steak.png" alt="strawberries and steak" />
            <div className="card-body">
              <h4 className="card-title">Strawberries and Steak</h4>
              <p className="card-text">Fresh greens are tossed with strawberries, toasted pecans, and blue
                cheese. A lively dressing unites all the flavors into a springtime delight!</p>
              <p className="card-text text-right"><small className="text-muted">Recipe by James</small></p>
              <Link to="/viewrecipe" className="btn btn-success">Read more</Link>
              <span className="downvote"><img src="images/downvote.png" width="30" height="30"
                alt="downvote" /> </span>
              <span className="upvote"><img src="images/upvote.png" width="30" height="30"
                alt="upvote" /> </span>
              <span className="favorite"><img src="images/favorite.png" width="30" height="30"
                alt="favorite" /> </span>
            </div>
            <div className="card-footer">
              <small className="text-muted">Last updated 3 mins ago</small>
            </div>
          </div>
          <div className="card">
            <img className="card-img-top" src="images/dessert salad.png" alt="dessert salad" />
            <div className="card-body">
              <h4 className="card-title">Delight Dessert Salad</h4>
              <p className="card-text">A fun salad that kids, and just about everyone else, will love.
                Fruit cocktail, grapes, mandarin oranges, whipped topping and mini marshmallows, are
                stirred together and chilled. Serves eight.</p>
              <p className="card-text text-right"><small className="text-muted">Recipe by Anne</small></p>
              <Link to="/viewrecipe" className="btn btn-success">Read more</Link>
              <span className="downvote"><img src="images/downvote.png" width="30" height="30"
                alt="upvote" /> </span>
              <span className="upvote"><img src="images/upvote.png" width="30" height="30"
                alt="upvote" /> </span>
              <span className="upvote"><img src="images/favorite.png" width="30" height="30"
                alt="favorite" /> </span>
            </div>
            <div className="card-footer">
              <small className="text-muted">Last updated 3 mins ago</small>
            </div>
          </div>
          <div className="card">
            <img className="card-img-top" src="images/dessert pizza.png" alt="dessert pizza" />
            <div className="card-body">
              <h4 className="card-title">Dessert Pizza</h4>
              <p className="card-text">The crust is made from cookie dough and cooked until golden brown.
                The topping is a whipped topping and a swirl of fresh fruit slices -kiwi, strawberries or
                peaches.</p>
              <p className="card-text text-right"><small className="text-muted">Recipe by Joy</small></p>
              <Link to="/viewrecipe" className="btn btn-success">Read more</Link>
              <span className="downvote"><img src="images/downvote.png" width="30" height="30"
                alt="downvote" /> </span>
              <span className="upvote"><img src="images/upvote.png" width="30" height="30"
                alt="upvote" /> </span>
              <span className="favorite"><img src="images/favorite.png" width="30" height="30"
                alt="favorite" /> </span>
            </div>

            <div className="card-footer">
              <small className="text-muted">Last updated 3 mins ago</small>
            </div>
          </div>
        </div> <br />
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className="page-item disabled">
              <a className="page-link" href="#" tabIndex="-1">Previous</a>
            </li>
            <li className="page-item"><a className="page-link" href="#">1</a></li>
            <li className="page-item"><a className="page-link" href="#">2</a></li>
            <li className="page-item"><a className="page-link" href="#">3</a></li>
            <li className="page-item">
              <a className="page-link" href="#">Next</a>
            </li>
          </ul>
        </nav>
      </div>);
  }
}
