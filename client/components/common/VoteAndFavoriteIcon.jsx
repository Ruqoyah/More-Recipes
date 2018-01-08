import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  upvoteRecipeAction,
  downvoteRecipeAction,
  favoriteAction
} from '../../actions/recipesActions';
import { toastrOption } from '../../helper';

/**
 * @class AllRecipes
 *
 * @classdesc Recipes page component
 *
 */
class VoteAndFavoriteIcon extends Component {
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
      upvotes: this.props.upvotes,
      downvotes: this.props.downvotes
    };
    this.id = this.props.id;
    this.userId = this.props.userId;
    this.currentLocation = this.props.currentLocation;
    this.handleUpvoteClick = this.handleUpvoteClick.bind(this);
    this.handleDownvoteClick = this.handleDownvoteClick.bind(this);
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
  }

  /**
   * @description - receive user details and set it to state userDetails
   *
   * @param {object} nextProps
   *
   * @return {void} no return or void
   *
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.upvotes !== this.props.upvotes || nextProps.downvotes !== this.props.downvotes) {
      this.setState({
        upvotes: nextProps.upvotes,
        downvotes: nextProps.downvotes
      });
    }
  }

  /**
   * @description - handles the upvote click event
   *
   * @param  {object} event the event for the content field
   *
   * @return {void} no return or void
   */
  handleUpvoteClick(event) {
    event.preventDefault();
    this.props.actions.upvoteRecipeAction(this.id);
  }

  /**
   * @description - handles the upvote click event
   *
   * @param  {object} event the event for the content field
   *
   * @return {void} no return or void
   */
  handleDownvoteClick(event) {
    event.preventDefault();
    this.props.actions.downvoteRecipeAction(this.id);
  }


  /**
   * @description - handles the favorite click event
   *
   * @param  {object} event the event for the content field
   *
   * @return {void} no return or void
   */
  handleFavoriteClick(event) {
    event.preventDefault();
    favoriteAction(this.id)
      .then((message) => {
        toastrOption();
        toastr.success(message);
      })
      .catch(message => {
        toastrOption();
        toastr.error(message);
      });
  }

  /**
   * @description render - renders the class component
   *
   * @return {object} returns an object
   */
  render() {
    return (
      <span>
        { (this.userId === this.props.user.userId) ?
          <span>
            <a>
              <i className="fa fa-thumbs-up fa-disabled"
                aria-hidden="true"
                style={{ fontSize: '22px', color: 'orange' }} />
            </a>
            <span style={{ fontSize: '12px', color: 'grey' }}>
              {this.state.upvotes}
            </span>
            <a>
              <i className="fa fa-thumbs-down fa-disabled"
                aria-hidden="true"
                style={{ fontSize: '22px', color: 'grey' }} />
            </a>
            <span style={{ fontSize: '12px', color: 'grey' }}>
              {this.state.downvotes}
            </span>
          </span> :
          <span>
            <a onClick={this.handleUpvoteClick}>
              <i className="fa fa-thumbs-up icon"
                aria-hidden="true"
                style={{ fontSize: '22px', color: 'orange' }} />
            </a>
            <span style={{ fontSize: '12px', color: 'grey' }}>
              {this.state.upvotes}
            </span>
            <a onClick={this.handleDownvoteClick}>
              <i className="fa fa-thumbs-down icon"
                aria-hidden="true"
                style={{ fontSize: '22px', color: 'grey' }} />
            </a>
            <span style={{ fontSize: '12px', color: 'grey' }}>
              {this.state.downvotes}
            </span>
          </span>
        }
        { (this.currentLocation === '/favorite-recipe') ?
          <a>
            <i
              className="fa fa-heart-o fa-disabled"
              aria-hidden="true"
              style={{ fontSize: '22px', color: 'red' }} />
          </a> :
          <a
            onClick={this.handleFavoriteClick} >
            <i
              className="fa fa-heart-o icon"
              aria-hidden="true"
              style={{ fontSize: '22px', color: 'red' }} />
          </a>
        }
      </span>

    );
  }
}

/**
 * @description mapStateToProps - maps state value to props
 *
 * @param  {object} state the store state
 *
 * @return {Object} returns state object
 *
 */
function mapStateToProps(state) {
  return {
    user: state.auth.user.currentUser
  };
}

/**
 * mapDispatchToProps - maps dispatch to props value
 *
 * @param  {Function} dispatch dispatchs function
 *
 * @return {Object} returns an Object
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      upvoteRecipeAction,
      downvoteRecipeAction
    }, dispatch)
  };
}

VoteAndFavoriteIcon.propTypes = {
  actions: PropTypes.object,
  upvotes: PropTypes.number,
  downvotes: PropTypes.number,
};


export default connect(mapStateToProps, mapDispatchToProps)(VoteAndFavoriteIcon);
