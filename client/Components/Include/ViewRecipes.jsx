import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Transformation } from 'cloudinary-react';
import { bindActionCreators } from 'redux';
import { favoriteAction, reviewRecipeAction, 
    getReviewAction } from '../../Actions/RecipesActions';


/**
 * @class MyRecipes
 * @classdesc view recipe component
 */
class ViewRecipes extends Component {

  /**
   * constructor - contains the constructor
   * @param  {object} props the properties of the class component
   * @return {void} no return or void
   */
  constructor(props){
    super(props);
    const { userId } = this.props.user
    this.state = {
      review: '', 
      userId
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
  }

   /**
   * @description - handles the onchange event
   * @param  {object} event the event for the content field
   * @return {void}
   */
  onChange(event) {
    const name = event.target.name,
      value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  /**
   * @description - handles review recipes
   * @param  {object} event the event for the content field
   */
  onSubmit(event){
    event.preventDefault();
    this.props.actions.reviewRecipeAction(this.props.id, this.state)
    this.refs.reviewForm.reset();
    this.setState({ 
      review: ''
    });
  }
  
  /**
   * @description - gets view recipe details
   * @return {void} no return or void
   */
  componentDidMount() {
    const recipeId = Number(location.search.split('=')[1].replace("&page", ""))
    this.props.actions.getReviewAction(recipeId);
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
   * @description render - renders the class component
   * @return {object} returns an object
   */
  render() {
    let {reviews} = this.props;
    return (
        <div 
          className="view-recipe">
          <div 
            className="container">
            <h2>
              {this.props.recipeName}
            </h2> <hr />
            <Image 
              cloudName="ruqoyah" 
              className="img-thumbnail" 
              publicId={this.props.picture}>
              <Transformation 
                width="800" 
                crop="fill" />
            </Image> <hr />
            <h4>Ingredients</h4>
            <p>
              {this.props.ingredient}
            </p><hr />
            <h4>Details</h4>
            <p>
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
                          <img src="/images/picture.png" />
                        </div>
                        <p className="chat-message">
                          {displayReview.review}
                        </p>
                      </div>
                      </div>
                    )
                  } else {
                  return ( 
                    <div key={displayReview.id}>
                      <div className="chat friend">
                      <div className="user-photo">
                      <img src="/images/picture.png" />
                    </div>
                    <p className="chat-message">
                      {displayReview.review}
                    </p>
                  </div>
                </div>
                  )
                  }
                })
                }
              </div>
            </div>
          </div>
          {(window.location.search.split('=').splice(-1).toString() !== "myrecipe" &&
            window.location.search.split('=').splice(-1).toString() !== "favoriterecipe") &&
          <div>
          <div 
            className="add-style">
            </div>
            <form 
              ref="reviewForm" 
              onSubmit={this.onSubmit}>
            <div 
              className="post-form">
              <textarea 
                ref="review" 
                name="review" 
                onChange={this.onChange}>
              </textarea>
            </div>
            <button 
              name="post" 
              className="btn btn-outline-success review">Post Review
            </button>
            </form>
           <div className="input-group">
            <a onClick={this.props.handleUpvoteClick}>
              <i className="fa fa-thumbs-up icon" 
                  aria-hidden="true" 
                  style={{ fontSize:'22px', color: 'orange', padding: '2px'}}>
              </i>
            </a>
            <span style={{ fontSize:'12px', color: 'grey', padding: '2px' }}>
              {this.props.upvotes}
            </span>
            <a 
              onClick={this.props.handleDownvoteClick}>
              <i 
                className="fa fa-thumbs-down icon" 
                aria-hidden="true" 
                style={{ fontSize:'22px', color: 'grey', padding: '2px' }}>
              </i>
            </a>
            <span 
              style={{ fontSize:'12px', color: 'grey', padding: '2px'}}>
              {this.props.downvotes}
            </span>
            <a 
              onClick={this.handleFavoriteClick} >
              <i 
                className="fa fa-heart-o icon" aria-hidden="true" 
                style={{ fontSize:'22px', color: 'red', padding: '2px' }}>
              </i>
            </a>
            <a>
              <i 
                className="fa fa-eye" aria-hidden="true" 
                style={{ fontSize:'22px', color: 'grey', padding: '2px' }}>
              </i>
            </a>
            <span 
              style={{ fontSize:'12px', color: 'grey', padding: '2px' }}>
              {this.props.views}
            </span>
          </div>
          </div>
            } 
        </div>);
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
    reviews: state.recipe.reviews
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
      reviewRecipeAction,
      getReviewAction
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewRecipes);
