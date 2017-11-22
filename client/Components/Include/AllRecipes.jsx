import React, { Component } from 'react';
import moment from 'moment';
import { Image, Transformation } from 'cloudinary-react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { favoriteAction, upvoteRecipeAction, downvoteRecipeAction, 
          viewRecipeAction } from '../../Actions/RecipesActions';


class AllRecipes extends Component {
  
  constructor(props){
    super(props);
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
    this.handleUpvoteClick = this.handleUpvoteClick.bind(this);
    this.handleDownvoteClick = this.handleDownvoteClick.bind(this);
    this.handleViewClick = this.handleViewClick.bind(this);

    this.state = {
      redirectOnClick: false
    }
  }

  handleFavoriteClick(event){
    event.preventDefault();
    favoriteAction( this.props.id, this.props.user.userId)
    .then((status) => {
      if(status === true) {
      toastr.options = {
        "debug": false,
        "timeOut": "2000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      };
      toastr.success('Favorite Recipe added successfully');
    } else {
      toastr.error('You already favorite recipe')
    }
    })
  }

  handleUpvoteClick(event){
    event.preventDefault();
    this.props.actions.upvoteRecipeAction( this.props.id, this.props.user.userId)
  }

  handleDownvoteClick(event){
    event.preventDefault();
    this.props.actions.downvoteRecipeAction( this.props.id, this.props.user.userId)
  }

  handleViewClick(event){
    event.preventDefault();
    this.setState({ redirectOnClick: true });
  }

  render() {
    return (
      this.state.redirectOnClick 
      ? 
        <Redirect to = {`/user/viewrecipe?id=${this.props.id}`}/>
      : 
      <div className="col-sm-3">      
      <div className="card">
      <div>
        <Image cloudName="ruqoyah" className="card-img-top" publicId={this.props.picture}>
        <Transformation width="302" height="200" crop="fill" />
        </Image>
      </div>
        <div className="card-body">
          <h4 className="card-title ellipses">{this.props.recipeName}</h4>
          <p className="card-text ellipses">{this.props.details}</p>
          <p className="card-text text-right"><small className="text-muted recipe-by">Recipe by {this.props.username}</small></p>
          <button onClick={this.handleViewClick} className="btn btn-success">Read more</button>
          <a href="" onClick={this.handleUpvoteClick}>
            <i className="fa fa-thumbs-up" aria-hidden="true" 
            style={{ fontSize:'25px', color: 'orange'}}></i></a>
            <span>{this.props.upvotes}</span>
          <a href="" onClick={this.handleDownvoteClick}>
            <i className="fa fa-thumbs-down" aria-hidden="true" 
            style={{ fontSize:'25px', color: 'grey' }}></i></a>
            <span>{this.props.downvotes}</span>
          <a href="" onClick={this.handleFavoriteClick} >
            <i className="fa fa-heart-o" aria-hidden="true" 
            style={{ fontSize:'25px', color: 'red' }}></i></a>
        </div>
        <div className="card-footer">
          <small className="text-muted">Updated: {moment(this.props.updatedAt).format('LLLL')}</small>
        </div>
      </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user.currentUser,
    recipes: state.recipe.recipes
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      upvoteRecipeAction,
      downvoteRecipeAction
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllRecipes);
