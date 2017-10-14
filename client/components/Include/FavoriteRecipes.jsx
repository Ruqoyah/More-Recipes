import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class FavoriteRecipes extends Component{
  // constructor(props){
  //   super(props);
  //   this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
  //   this.handleUpvoteClick = this.handleUpvoteClick.bind(this);
  //   this.handleDownvoteClick = this.handleDownvoteClick.bind(this);
  //   this.handleViewClick = this.handleViewClick.bind(this);
  // }

  // handleFavoriteClick(e){
  //   e.preventDefault();
  //   favoriteAction( this.props.id, this.props.user.userId)
  //   .then((status) => {
  //     if(status === true) {
  //     toastr.options = {
  //       "debug": false,
  //       "positionClass": "toast-top-full-width",
  //       "timeOut": "2000",
  //       "showEasing": "swing",
  //       "hideEasing": "linear",
  //       "showMethod": "fadeIn",
  //       "hideMethod": "fadeOut"
  //     };
  //     toastr.options.onHidden = function () {
  //       window.location.reload()
  //     }
  //     toastr.success('Favorite Recipe added successfully');
  //   } else {
  //     toastr.error('You already favorite recipe')
  //   }
  //   })
  // }

  // handleUpvoteClick(e){
  //   e.preventDefault();
  //   upvoteRecipeAction( this.props.id, this.props.user.userId)
  //   .then((status) => {
  //     if(status === true) {
  //     toastr.options = {
  //       "debug": false,
  //       "positionClass": "toast-top-full-width",
  //       "timeOut": "2000",
  //       "showEasing": "swing",
  //       "hideEasing": "linear",
  //       "showMethod": "fadeIn",
  //       "hideMethod": "fadeOut"
  //     };
  //     toastr.options.onHidden = function () {
  //       window.location.reload()
  //     }
  //     toastr.success('Upvote added successfully');
  //   } else {
  //     toastr.error('You already upvoted')
  //   }
  //   })
  // }

  // handleDownvoteClick(e){
  //   e.preventDefault();
  //   downvoteRecipeAction( this.props.id, this.props.user.userId)
  //   .then((status) => {
  //     if(status === true) {
  //     toastr.options = {
  //       "debug": false,
  //       "positionClass": "toast-top-full-width",
  //       "timeOut": "2000",
  //       "showEasing": "swing",
  //       "hideEasing": "linear",
  //       "showMethod": "fadeIn",
  //       "hideMethod": "fadeOut"
  //     };
  //     toastr.options.onHidden = function () {
  //       window.location.reload()
  //     }
  //     toastr.success('Downvote added successfully');
  //   } else {
  //     toastr.error('You already downvoted')
  //   }
  //   })
  // }

  handleViewClick(e){
    window.location.href = `/viewrecipe?id=${this.props.id}`
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
          <a href="" onClick={this.handleUpvoteClick}>
            <i className="fa fa-thumbs-up" aria-hidden="true" 
            style={{ fontSize:'25px', color: 'orange'}}></i></a>
            <span>{this.props.votes}</span>
          <a href="" onClick={this.handleDownvoteClick}>
            <i className="fa fa-thumbs-down" aria-hidden="true" 
            style={{ fontSize:'25px', color: 'grey' }}></i></a>
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
