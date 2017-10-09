import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class FavoriteRecipes extends Component{
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
          <a href="" ><i className="fa fa-thumbs-up" aria-hidden="true" style={{ fontSize:'30px', color: 'orange'}}></i></a>
          <a href="" ><i className="fa fa-thumbs-down" aria-hidden="true" style={{ fontSize:'30px', color: 'grey' }}></i></a>
          <a href="" onClick={this.handleClick} ><i className="fa fa-heart-o" aria-hidden="true" 
            style={{ fontSize:'30px', color: 'red' }}></i></a>
        </div>
        <div className="card-footer">
          <small className="text-muted">Last updated 3 mins ago</small>
        </div>
      </div>
      </div>
    )
  }
}
