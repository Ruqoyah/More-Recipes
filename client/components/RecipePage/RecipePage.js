import React, { Component } from 'react';
import { render } from 'react-dom';

export default class RecipePage extends Component {

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">
            <img src="images/logo.png" width="270" height="59" alt="logo" />
          </a>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                </li>
              </ul>
              <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </ul>
          </div>

          <a className="navbar-brand" href="#"><img src="images/bell.png" width="32" height="33" alt="bell" /></a>
          <a className="navbar-brand" href="#"><img src="images/picture.png" width="45" height="45" alt="picture" /></a>
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Profile</button>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="#">View profile</a>
              <a className="dropdown-item" href="#">My Recipes</a>
              <a className="dropdown-item" href="#">Favorite Recipes</a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">Log out</a>
            </div>
          </div>
        </nav>

        <div className="card-deck">
          <div className="card">
            <img className="card-img-top" src="images/strawberries and steak.png" alt="strawberries and steak" />
            <div className="card-body">
              <h4 className="card-title">Strawberries and Steak</h4>
              <p className="card-text">Fresh greens are tossed with strawberries, toasted pecans, and blue cheese. A lively dressing unites all
                    the flavors into a springtime delight!</p>
              <p className="card-text text-right"><small class="text-muted">Recipe by James</small></p>
              <a href="#" className="btn btn-success">Read more</a>
              <span className="downvote"><img src="images/downvote.png" width="30" height="30" alt="downvote" /> </span>
              <span className="upvote"><img src="images/upvote.png" width="30" height="30" alt="upvote" /> </span>
              <span className="favorite"><img src="images/favorite.png" width="30" height="30" alt="favorite" /> </span>
            </div>
            <div className="card-footer">
              <small className="text-muted">Last updated 3 mins ago</small>
            </div>
          </div>
          <div className="card">
            <img className="card-img-top" src="images/dessert salad.png" alt="dessert salad" />
            <div className="card-body">
              <h4 className="card-title">Delight Dessert Salad</h4>
              <p className="card-text">A fun salad that kids, and just about everyone else, will love. Fruit cocktail, grapes, mandarin oranges,
                    whipped topping and mini marshmallows, are stirred together and chilled. Serves eight.</p>
              <p className="card-text text-right"><small class="text-muted">Recipe by Anne</small></p>
              <a href="#" className="btn btn-success">Read more</a>
              <span className="downvote"><img src="images/downvote.png" width="30" height="30" alt="upvote" /> </span>
              <span className="upvote"><img src="images/upvote.png" width="30" height="30" alt="upvote" /> </span>
              <span className="upvote"><img src="images/favorite.png" width="30" height="30" alt="favorite" /> </span>
            </div>
            <div className="card-footer">
              <small className="text-muted">Last updated 3 mins ago</small>
            </div>
          </div>
          <div className="card">
            <img className="card-img-top" src="images/dessert pizza.png" alt="dessert pizza" />
            <div className="card-body">
              <h4 className="card-title">Dessert Pizza</h4>
              <p className="card-text">The crust is made from cookie dough and cooked until golden brown. The topping is a whipped topping and a
                    swirl of fresh fruit slices -kiwi, strawberries or peaches.</p>
              <p className="card-text text-right"><small class="text-muted">Recipe by Joy</small></p>
              <a href="#" className="btn btn-success">Read more</a>
              <span className="downvote"><img src="images/downvote.png" width="30" height="30" alt="downvote" /> </span>
              <span className="upvote"><img src="images/upvote.png" width="30" height="30" alt="upvote" /> </span>
              <span className="favorite"><img src="images/favorite.png" width="30" height="30" alt="favorite" /> </span>
            </div>

            <div className="card-footer">
              <small className="text-muted">Last updated 3 mins ago</small>
            </div>
          </div>
        </div> <br />
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className="page-item disabled">
              <a className="page-link" href="#" tabindex="-1">Previous</a>
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
