import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class RecipeList extends Component{
    render(){
      return(
        <div className="card">
        <img className="card-img-top" src={this.props.picture} alt="dessert salad" />
        <div className="card-body">
          <h4 className="card-title">{this.props.recipeName}</h4>
          <p className="card-text">{this.props.details}</p>
          <Link to="/viewrecipe" className="btn btn-success">Read more</Link> 
          <a href="" ><i className="fa fa-thumbs-up" aria-hidden="true" style={{ fontSize:'30px', color: 'orange'}}></i></a>
          <a href="" ><i className="fa fa-thumbs-down" aria-hidden="true" style={{ fontSize:'30px', color: 'grey' }}></i></a>
          <a href="" ><i className="fa fa-heart-o" aria-hidden="true" style={{ fontSize:'30px', color: 'red' }}></i></a> <hr />
          <div className="btn-toolbar">
          <a href="#" className="btn btn-outline-primary">Edit</a>
          <a href="#" className="btn btn-outline-danger">Delete</a>
          </div>
        </div>
      </div> 
      )
    }
}
