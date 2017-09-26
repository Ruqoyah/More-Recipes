import React, { Component } from 'react';
import { render } from 'react-dom';

export default class AddRecipe extends Component {

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">More Recipes</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Favourite Recipes</a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <div className="post-form">
                <textarea></textarea>
              </div>
              <label className="custom-file">
                <input type="file" id="file2" className="custom-file-input" />
                <span className="custom-file-control">Upload Picture</span>
              </label>
              <div className="input-group">
                <a href="#" className="btn btn-outline-danger btn-lg active">Post</a>
              </div>
            </div>
            <div className="col">
              <div className="card" style="width: 20rem;">
                <img className="card-img-top" src="images/dessert salad.png" alt="dessert salad" />
                <div className="card-body">
                  <h4 className="card-title">Dessert Recipe</h4>
                  <p className="card-text">A fun salad that kids, and just about everyone else, will love. Fruit cocktail, grapes, mandarin
                            oranges, whipped topping and mini marshmallows, are stirred together and chilled. Serves eight</p>
                  <a href="#" className="btn btn-primary">Edit</a>
                  <a href="#" className="btn btn-primary">Delete</a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>);
  }
}


