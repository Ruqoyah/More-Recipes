import React, { Component } from 'react';
import moment from 'moment';
import { Image, Transformation } from 'cloudinary-react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { favoriteAction, upvoteRecipeAction, 
         downvoteRecipeAction, viewRecipeAction } from '../../Actions/RecipesActions';

/**
 * @class AllRecipes
 * @classdesc Recipes page component
 */
class AllRecipes extends Component {

  /**
   * constructor - contains the constructor
   * @param  {object} props the properties of the class component
   * @return {void} no return or void
   */
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
  
  /**
   * @description - handles the favorite click event
   * @param  {object} event the event for the content field
   * @return {void} no return or void
   */
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
  
  /**
   * @description - handles the upvote click event
   * @param  {object} event the event for the content field
   * @return {void} no return or void
   */
  handleUpvoteClick(event){
    event.preventDefault();
    this.props.actions.upvoteRecipeAction( this.props.id, this.props.user.userId)
  }

  /**
   * @description - handles the upvote click event
   * @param  {object} event the event for the content field
   * @return {void} no return or void
   */
  handleDownvoteClick(event){
    event.preventDefault();
    this.props.actions.downvoteRecipeAction( this.props.id, this.props.user.userId)
  }

  /**
   * @description - handles the view click event
   * @param  {object} event the event for the content field
   * @return {void} no return or void
   */
  handleViewClick(event){
    event.preventDefault();
    this.setState({ redirectOnClick: true });
  }

  /**
   * @description render - renders the class component
   * @return {object} returns an object
   */
  render() {
    return (
      this.state.redirectOnClick 
      ? 
        <Redirect to = {`/user/viewrecipe?id=${this.props.id}`}/>
      : 
      <div className="col-sm-3">      
      <div className="card">
      <div>
        <Image 
          cloudName="ruqoyah" 
          className="card-img-top" 
          publicId={this.props.picture}>
          <Transformation width="302" 
            height="200" crop="fill" />
        </Image>
      </div>
        <div 
          className="card-body">
          <h4 
            className="card-title ellipses">
            {this.props.recipeName}
          </h4>
          <p className="card-text ellipses">
            {this.props.details}
          </p>
          <p className="card-text text-right">
            <small 
              className="text-muted recipe-by">
              Recipe by {this.props.username}
            </small>
          </p>
          <button onClick={this.handleViewClick} 
            className="btn btn-success">
            Read more
          </button>
          <a onClick={this.handleUpvoteClick}>
            <i className="fa fa-thumbs-up icon" 
              aria-hidden="true" 
              style={{ fontSize:'22px', color: 'orange'}}>
            </i>
          </a>
            <span style={{ fontSize:'12px', color: 'grey'}}>
              {this.props.upvotes}
            </span>
          <a onClick={this.handleDownvoteClick}>
            <i className="fa fa-thumbs-down icon" 
              aria-hidden="true" 
             style={{ fontSize:'22px', color: 'grey' }}>
            </i>
          </a>
            <span style={{ fontSize:'12px', color: 'grey'}}>
              {this.props.downvotes}
            </span>
          <a 
            onClick={this.handleFavoriteClick} >
            <i 
              className="fa fa-heart-o icon" 
              aria-hidden="true" 
              style={{ fontSize:'22px', color: 'red' }}>
            </i>
          </a>
        </div>
        <div 
          className="card-footer">
          <small 
            className="text-muted">
            Updated: {moment(this.props.updatedAt).format('LLLL')}
          </small>
        </div>
      </div>
      </div>
    )
  }
}

/**
 * @description mapStateToProps - maps state value to props
 * @param  {object} state the store state
 * @return {Object} returns state object
 */
function mapStateToProps(state) {
  return {
    user: state.auth.user.currentUser,
    recipes: state.recipe.recipes
  }
}

/**
 * mapDispatchToProps - maps dispatch to props value
 * @param  {Function} dispatch dispatchs function
 * @return {Object} returns an Object
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      upvoteRecipeAction,
      downvoteRecipeAction
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllRecipes);
