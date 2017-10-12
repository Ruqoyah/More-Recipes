import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { favoriteAction, upvoteRecipeAction, downvoteRecipeAction,
          reviewRecipeAction, getReviewAction } from '../../actions/recipes_action';

class ViewRecipes extends Component {
  constructor(props){
    super(props);
    const { userId } = this.props.user
    this.state = {
      review: '', 
      userId,
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
    this.handleUpvoteClick = this.handleUpvoteClick.bind(this);
    this.handleDownvoteClick = this.handleDownvoteClick.bind(this);
  }

  onChange(event) {
    const name = event.target.name,
      value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  onSubmit(e){
    e.preventDefault();
    this.props.actions.reviewRecipeAction(this.props.id, this.state)
    this.refs.reviewForm.reset();
  }

  componentDidMount() {
    if(this.props.id){
      this.props.actions.getReviewAction(this.props.id);
    }
  }

  handleFavoriteClick(e){
    e.preventDefault();
    favoriteAction( this.props.id, this.props.user.userId)
    .then((status) => {
      if(status === true) {
      toastr.options = {
        "debug": false,
        "positionClass": "toast-top-full-width",
        "timeOut": "2000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      };
      toastr.options.onHidden = function () {
        window.location.reload()
      }
      toastr.success('Favorite Recipe added successfully');
    } else {
      toastr.error('You already favorite recipe')
    }
    })
  }

  handleUpvoteClick(e){
    e.preventDefault();
    upvoteRecipeAction( this.props.id, this.props.user.userId)
    .then((status) => {
      if(status === true) {
      toastr.options = {
        "debug": false,
        "positionClass": "toast-top-full-width",
        "timeOut": "2000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      };
      toastr.options.onHidden = function () {
        window.location.reload()
      }
      toastr.success('Upvote added successfully');
    } else {
      toastr.error('You already upvoted')
    }
    })
  }

  handleDownvoteClick(e){
    e.preventDefault();
    downvoteRecipeAction( this.props.id, this.props.user.userId)
    .then((status) => {
      if(status === true) {
      toastr.options = {
        "debug": false,
        "positionClass": "toast-top-full-width",
        "timeOut": "2000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      };
      toastr.options.onHidden = function () {
        window.location.reload()
      }
      toastr.success('Downvote added successfully');
    } else {
      toastr.error('You already downvoted')
    }
    })
  }
  
  render() {
    let {reviews} = this.props;

    return (
        <div className="view-recipe">
          <div className="container">
            <h2>{this.props.recipeName}</h2> <hr />
            <img src={this.props.picture} className="img-thumbnail" alt="strawberry"
              width="700" /> <hr />
            <h4>Ingredients</h4>
            <p>{this.props.ingredient}</p><hr />
            <h4>Details</h4>
            <p>{this.props.details}</p>
            <div className="chatlogs">
              <div>
                {
                  reviews.map((displayReview) => {
                    if (displayReview.userId === this.props.user.userId) {
                      return ( <div key={displayReview.id}>
                        <div className="chat self">
                          <div className="user-photo"> <img src="images/picture.png" /></div>
                          <p className="chat-message">{displayReview.review}</p>
                          </div>
                          </div>
                      )
                    } else {
                    return ( <div key={displayReview.id}>
                    <div className="chat friend">
                      <div className="user-photo"><img src="images/picture.png" /></div>
                      <p className="chat-message">{displayReview.review}</p>
                    </div>
                  </div>
                    )
                    }
                  })
                }
              </div>
            </div>
            <div className="add-style">
            <a href="#">View more</a>
            </div>
            <form ref="reviewForm" onSubmit={this.onSubmit}>
            <div className="post-form">
              <textarea ref="review" name="review" 
              onChange={this.onChange}></textarea>
            </div>
            <button name="post" className="btn btn-outline-primary active">Post Review</button>
            </form>
          </div>
          <div className="input-group">
            <a href="" onClick={this.handleUpvoteClick}>
            <i className="fa fa-thumbs-up" aria-hidden="true" 
            style={{ fontSize:'30px', color: 'orange'}}></i></a>
            <span>{this.props.votes}</span>
          <a href="" onClick={this.handleDownvoteClick}>
            <i className="fa fa-thumbs-down" aria-hidden="true" 
            style={{ fontSize:'30px', color: 'grey' }}></i></a>
          <a href="" onClick={this.handleFavoriteClick} >
            <i className="fa fa-heart-o" aria-hidden="true" 
            style={{ fontSize:'30px', color: 'red' }}></i></a>
            <a href="" >
            <i className="fa fa-eye" aria-hidden="true" 
            style={{ fontSize:'30px', color: 'grey' }}></i></a>
            <span>{this.props.views}</span>
          </div>
        </div>);
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user.currentUser,
    reviews: state.recipe.reviews,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      reviewRecipeAction,
      getReviewAction
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewRecipes);