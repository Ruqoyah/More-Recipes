import React, { Component } from 'react';
import { Image, Transformation } from 'cloudinary-react';
import moment from 'moment';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/**
 * @class FavoriteRecipes
 * @classdesc favorite recipe component
 */
class FavoriteRecipes extends Component{

  /**
   * constructor - contains the constructor
   * @param  {object} props the properties of the class component
   * @return {void} no return or void
   */
  constructor(props){
    super(props);
    this.state = {
      redirectOnClick: false
    }
    this.handleViewClick = this.handleViewClick.bind(this);
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
        <Redirect to = {`/user/viewrecipe?id=${this.props.recipeId}&page=favoriterecipe`}/>
      : 
      <div 
        className="col-sm-3">      
      <div 
        className="card">
      <div>
      <Image 
        cloudName="ruqoyah" 
        className="card-img-top" 
        publicId={this.props.picture}>
        <Transformation width="302" 
          height="200" 
          crop="fill" />
      </Image>
      </div>
        <div 
          className="card-body">
          <h4 
            className="card-title ellipses">
            {this.props.recipeName}
          </h4>
          <p 
            className="card-text ellipses">
            {this.props.details}
          </p>
          <p 
            className="card-text text-right">
            <small 
              className="text-muted recipe-by">
              Recipe by {this.props.username} 
            </small>
          </p>
          <button 
            onClick={this.handleViewClick} 
            className="btn btn-success"> Read more
          </button>
        </div>
        <div className="card-footer">
          <small className="text-muted">
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
    user: state.auth.user.currentUser
  }
}

export default connect(mapStateToProps)(FavoriteRecipes);
