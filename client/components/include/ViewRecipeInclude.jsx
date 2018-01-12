import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { Image, Transformation } from 'cloudinary-react';
import { bindActionCreators } from 'redux';
import {
  reviewRecipeAction,
  getReviewAction
} from '../../actions/recipesActions';
import VoteAndFavoriteIcon from '../common/VoteAndFavoriteIcon';


/**
 * @class MyRecipes
 *
 * @classdesc view recipe component
 *
 */
export class ViewRecipeInclude extends Component {
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
      review: '',
      offset: 1
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  /**
   * @description - gets view recipe details
   *
   * @return {void} no return or void
   *
   */
  componentDidMount() {
    this.props.actions.getReviewAction(this.props.id, this.state.offset);
  }

  /**
   * @description - handles review recipes
   *
   * @param  {object} event the event for the content field
   *
   * @return {void} no return or void
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.actions.reviewRecipeAction(this.props.id, this.state);
    this.refs.reviewForm.reset();
    this.setState({
      review: ''
    });
  }

  /**
   * @description - set offset
   *
   * @param  {object} event the event for the content field
   *
   * @return {void} no return or void
   */
  onClick(event) {
    event.preventDefault();
    this.setState({
      offset: this.state.offset + 1
    });
    this.props.actions.getReviewAction(this.props.id, this.state.offset + 1);
  }

  /**
   * @description - handles the onchange event
   *
   * @param  {object} event the event for the content field
   *
   * @return {void}
   *
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * @description render - renders the class component
   *
   * @return {object} returns an object
   *
   */
  render() {
    let { reviews } = this.props;
    return (
      <div
        className="container-fluid view-recipe">
        <h2
          id="recipe-name">
          {this.props.recipeName}
        </h2> <hr />
        <div className="row">
          <div className="col-sm-6">
            <Image
              cloudName={process.env.CLOUD_NAME}
              className="img-thumbnail"
              publicId={this.props.picture}>
              <Transformation
                width="900"
                height="600"
                crop="fill" />
            </Image>
          </div>
          <div className="col-sm-6">
            <h4
              className="ingredients">Ingredients</h4>
            <p
              id="input-ingredients">
              {this.props.ingredient}
            </p><hr />
            <h4
              className="details">Details</h4>
            <p
              id="input-details">
              {this.props.details}
            </p>
            <div
              className="chatlogs">
              <div>
                {
                  reviews.map((displayReview) => {
                    if (displayReview.userId === this.props.user.userId) {
                      return (
                        <div key={displayReview.id}>
                          <div className="chat self">
                            <div className="user-photo">
                              { displayReview.User.picture === null ?
                                <img src="/images/picture.png"/> :
                                <Image
                                  cloudName={process.env.CLOUD_NAME}
                                  publicId={displayReview.User.picture}>
                                  <Transformation
                                    width="50"
                                    crop="fill" />
                                </Image>
                              }
                            </div>
                            <p className="chat-message">
                              <span style={{ color: 'black', fontWeight: '800', paddingRight: '5px' }}>
                                {displayReview.User.username}
                              </span> {displayReview.review}
                            </p>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div key={displayReview.id}>
                          <div className="chat friend">
                            <div className="user-photo">
                              { displayReview.User.picture === null ?
                                <img src="/images/picture.png"/> :
                                <Image
                                  cloudName={process.env.CLOUD_NAME}
                                  publicId={displayReview.User.picture}>
                                  <Transformation
                                    width="50"
                                    crop="fill" />
                                </Image>
                              }
                            </div>
                            <p className="chat-message">
                              <span style={{ color: 'black', fontWeight: '800', paddingRight: '5px' }}>
                                {displayReview.User.username}
                              </span> {displayReview.review}
                            </p>
                          </div>
                        </div>
                      );
                    }
                  })
                }
              </div>
            </div>
            <div className="text-center">
              {(this.props.reviewCount) > 5 ? <button
                onClick={this.onClick}
                className="btn btn-outline-danger">Load More</button> : ''}
            </div>
            <div>
              <div
                className="add-style" />
              <form
                ref="reviewForm"
                onSubmit={this.onSubmit}>
                <div
                  className="post-form">
                  <textarea
                    ref="review"
                    name="review"
                    onChange={this.onChange} />
                </div>
                <div className="row">
                  <div className="col-sm-7 icon">
                    <VoteAndFavoriteIcon
                      id={this.props.id}
                      upvotes={this.props.upvotes}
                      downvotes={this.props.downvotes}
                      userId={this.props.userId}/>
                    <a>
                      <i
                        className="fa fa-eye"
                        aria-hidden="true"
                        style={{ fontSize: '22px', color: 'grey', padding: '2px' }} />
                    </a>
                    <span
                      style={{ fontSize: '12px', color: 'grey', padding: '2px' }}>
                      {this.props.views}
                    </span>
                  </div>
                  <div className="col-sm-5">
                    <button
                      name="post"
                      className="btn btn-outline-success review">Post Review
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>);
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
export function mapStateToProps(state) {
  return {
    user: state.auth.user.currentUser,
    reviews: state.recipe.reviews,
    reviewCount: state.recipe.reviewCount
  };
}

/**
 * @description mapDispatchToProps - maps dispatch to props value
 *
 * @param  {Function} dispatch dispatchs function
 *
 * @return {Object} returns an Object
 *
 */
export function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      reviewRecipeAction,
      getReviewAction
    }, dispatch)
  };
}

ViewRecipeInclude.propTypes = {
  id: PropTypes.string,
  actions: PropTypes.object,
  imageUrl: PropTypes.object,
  recipeName: PropTypes.string,
  ingredient: PropTypes.string,
  details: PropTypes.string,
  picture: PropTypes.string,
  upvotes: PropTypes.number,
  downvotes: PropTypes.number,
  views: PropTypes.number,
  user: PropTypes.object,
  reviews: PropTypes.array,
  handleDownvoteClick: PropTypes.func,
  handleUpvoteClick: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewRecipeInclude);
