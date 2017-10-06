import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class AllRecipes extends Component {
  render() {
    return (
      <div className="col-sm-4">      
      <div style={{marginBottom: '15px'}} className="card">
        <img className="card-img-top" src={this.props.picture}/>
        <div className="card-body">
          <h4 className="card-title">{this.props.recipeName}</h4>
          <p className="card-text">{this.props.details}</p>
          <p className="card-text text-right"><small className="text-muted">Recipe by James</small></p>
          <Link to="/viewrecipe" className="btn btn-success">Read more</Link>
          <span className="downvote"><img src="images/downvote.png" width="30" height="30"
            alt="downvote" /> </span>
          <span className="upvote"><img src="images/upvote.png" width="30" height="30"/> </span>
          <span className="favorite"><img src="images/favorite.png" width="30" height="30"/> </span>
        </div>
        <div className="card-footer">
          <small className="text-muted">Last updated 3 mins ago</small>
        </div>
      </div>
      </div>
    )
  }
}
