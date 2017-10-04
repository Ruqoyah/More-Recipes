import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import Header from '../Common/Header';

export default class FavoriteRecipe extends Component {

  render() {
    return (
      <div>
        <Header />
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
