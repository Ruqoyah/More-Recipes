import React, { Component } from 'react';
import { render } from 'react-dom';
import Header from '../Common/Header';

export default class ViewRecipe extends Component {

  render() {
    return (
      <div>
        <Header />
        <div className="view-recipe">
          <div className="container">
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
