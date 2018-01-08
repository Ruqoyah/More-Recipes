import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Image, Transformation } from 'cloudinary-react';
import { Redirect } from 'react-router-dom';
import VoteAndFavoriteIcon from './VoteAndFavoriteIcon';

/**
 * @class AllRecipes
 *
 * @classdesc Recipes page component
 *
 */
class RecipesCard extends Component {
  /**
   * constructor - contains the constructor
   *
   * @param  {object} props the properties of the class component
   *
   * @return {void} no return or void
   *
   */
  constructor(props) {
    super(props);
    this.state = {
      redirectOnClick: false
    };
    this.handleViewClick = this.handleViewClick.bind(this);
  }

  /**
   * @description - handles the view click event
   *
   * @param  {object} event the event for the content field
   *
   * @return {void} no return or void
   */
  handleViewClick(event) {
    event.preventDefault();
    this.setState({ redirectOnClick: true });
  }

  /**
   * @description render - renders the class component
   *
   * @return {object} returns an object
   */
  render() {
    return (
      this.state.redirectOnClick ?
        <Redirect to = {`/recipes/${this.props.id}`}/> :
        <div className="col-sm-3">
          <div className="card">
            <div>
              <Image
                cloudName={process.env.CLOUD_NAME}
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
              <div className="row">
                <div className="col">
                  <button onClick={this.handleViewClick}
                    className="btn btn-success">
            Read more
                  </button>
                </div>
                <div className="col">
                  <VoteAndFavoriteIcon
                    id={this.props.id}
                    upvotes={this.props.upvotes}
                    downvotes={this.props.downvotes}
                    userId={this.props.userId}
                    currentLocation={this.props.currentLocation}/>
                </div>
              </div>
            </div>
            <div
              className="card-footer">
              <small
                className="text-muted">
            Created: {moment(this.props.createdAt).format('LLLL')}
              </small>
            </div>
          </div>
        </div>
    );
  }
}

RecipesCard.propTypes = {
  id: PropTypes.number,
  actions: PropTypes.object,
  recipeName: PropTypes.string,
  details: PropTypes.string,
  picture: PropTypes.string,
  username: PropTypes.string,
  upvotes: PropTypes.number,
  downvotes: PropTypes.number,
  createdAt: PropTypes.string
};


export default RecipesCard;
