import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllRecipeAction } from '../../actions/recipes_action';
import Header from '../Common/Header';

class ViewRecipe extends Component {
  constructor(props){
    super(props);
  }



  componentDidMount() {
    this.props.actions.getAllRecipeAction(this.props.recipes)
  }

  render() {
    // const viewRecipes = this.props.recipes
    // console.log('view', viewRecipes)
    return (
      <div>
        <Header />
        <div className="view-recipe">
          <div className="container">
            <h2>Strawberry</h2> <hr />
            <img src={this.props.picture} className="img-thumbnail" alt="strawberry"
              width="700" /> <hr />
            <h4>Ingredients</h4>
            <p>{this.props.ingredients}</p><hr />
            <h4>Details</h4>
            <p>{this.props.details}
            </p>
            <div className="chatlogs">
              <div className="chat friend">
                <div className="user-photo"><img src="images/picture.png" /></div>
                <p className="chat-message">Nice post..!!</p>
              </div>
              <div className="chat friend">
                <div className="user-photo"><img src="images/picture.png" /></div>
                <p className="chat-message">Nice one....</p>
              </div>
              <div className="chat self">
                <div className="user-photo"> <img src="images/picture.png" /></div>
                <p className="chat-message">Thanks all</p>
              </div>
              <div className="chat friend">
                <div className="user-photo"><img src="images/picture.png" /></div>
                <p className="chat-message">Great post</p>
              </div>
              <div className="add-style">
                <a href="#">View more</a>
              </div>
            </div>
            <div className="post-form">
              <textarea></textarea>
            </div>
          </div>
          <div className="input-group">
            <a href="#" className="btn btn-outline-primary active">Post Review</a>
            <a href="" onClick={this.props.handleUpvoteClick}>
            <i className="fa fa-thumbs-up" aria-hidden="true" 
            style={{ fontSize:'30px', color: 'orange'}}></i></a>
            <span>{this.props.votes}</span>
          <a href="" onClick={this.props.handleDownvoteClick}>
            <i className="fa fa-thumbs-down" aria-hidden="true" 
            style={{ fontSize:'30px', color: 'grey' }}></i></a>
          <a href="" onClick={this.props.handleFavoriteClick} >
            <i className="fa fa-heart-o" aria-hidden="true" 
            style={{ fontSize:'30px', color: 'red' }}></i></a>
            <a href="" >
            <i className="fa fa-eye" aria-hidden="true" 
            style={{ fontSize:'30px', color: 'grey' }}></i></a>
          </div>
        </div>
      </div>);
  }
}

function mapStateToProps(state) {
  console.log('it is here now', state)
  return {
    recipes: state.recipe.recipes,
    user: state.auth.user.currentUser
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getAllRecipeAction
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewRecipe)
