import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import Header from '../Common/Header';

export default class AddRecipe extends Component {

  render() {
    return (
      <div>
        <Header />
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <div className="post-form">
                <h4>Recipe Name</h4>
                <textarea></textarea>
                <h4>Ingredients</h4>
                <textarea></textarea>
                <h4>Details</h4>
                <textarea></textarea>
              </div>
              <label className="custom-file">
                <input type="file" id="file2" className="custom-file-input" />
                <span className="custom-file-control">Upload Picture</span>
              </label>
              <div className="input-group">
                <a href="#" className="btn btn-outline-danger btn-lg">Post</a>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <img className="card-img-top" src="images/dessert salad.png" alt="dessert salad" />
                <div className="card-body">
                  <h4 className="card-title">Dessert Recipe</h4>
                  <p className="card-text">A fun salad that kids, and just about everyone else,
                    will love. Fruit cocktail, grapes, mandarin oranges, whipped topping and mini
                    marshmallows, are stirred together and chilled. Serves eight</p>
                  <Link to="/viewrecipe" className="btn btn-success">Read more</Link> <hr />
                  <a href="#" className="btn btn-outline-primary">Edit</a>
                  <a href="#" className="btn btn-outline-danger">Delete</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>);
  }
}


