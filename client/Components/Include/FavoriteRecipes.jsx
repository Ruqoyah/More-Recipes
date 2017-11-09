import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class FavoriteRecipes extends Component{
  constructor(props){
    super(props);
    this.handleViewClick = this.handleViewClick.bind(this);
  }

  handleViewClick(){
    window.location.href = `/viewrecipe?id=${this.props.recipeId}&page=favoriterecipe`
  }

  render() {
    return (
      <div className="col-sm-3">      
      <div className="card">
        <img className="card-img-top" src={this.props.picture}/>
        <div className="card-body">
          <h4 className="card-title">{this.props.recipeName}</h4>
          <p className="card-text">{this.props.details}</p>
          <p className="card-text text-right"><small className="text-muted">Recipe by James</small></p>
          <button onClick={this.handleViewClick} className="btn btn-success">Read more</button>
        </div>
        <div className="card-footer">
          <small className="text-muted">Last updated 3 mins ago</small>
        </div>
      </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user.currentUser
  }
}

export default connect(mapStateToProps)(FavoriteRecipes);
