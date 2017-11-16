import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { viewRecipeAction, viewUpvoteAction,
        viewDownvoteAction, } from '../../Actions/RecipesActions';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import ViewRecipes from '../Include/ViewRecipes';

/** @class ViewRecipe
 * @classdesc view recipe component
 */
class ViewRecipe extends Component {
  /**
   * constructor - contains the constructor
   * @param  {object} props the properties of the class component
   * @return {void} no return or void
   */
  constructor(props){
    super(props);
    
    this.handleUpvoteClick = this.handleUpvoteClick.bind(this);
    this.handleDownvoteClick = this.handleDownvoteClick.bind(this);
  }

  /**
   * @description render - renders view recipe details
   * @return {object} returns an object
   */
  renderRecipe() {
    let {
      picture, userId, recipeName, ingredient, details, upvotes, downvotes,
      views, Reviews, id } = this.props.viewRecipe;
    
    return (<div>
        <ViewRecipes
          picture={picture}
          userId={userId}
          recipeName={recipeName}
          ingredient={ingredient}
          details={details}
          upvotes={upvotes}
          downvotes={downvotes}
          views={views}
          review={Reviews}
          handleUpvoteClick={this.handleUpvoteClick}
          handleDownvoteClick={this.handleDownvoteClick}
          id={id}
          key={Math.random() * 10}
        />
      </div>) 
      }
  
  /**
   * @description - handles the upvote click event
   * @param  {object} event the event for the content field
   * @return {void} no return or void
   */
  handleUpvoteClick(event){
    event.preventDefault();
    this.props.actions.viewUpvoteAction(this.props.viewRecipe.id, this.props.user.userId)
  }
  
  /**
   * @description - handles the downvote click event
   * @param  {object} event the event for the content field
   * @return {void} no return or void
   */
  handleDownvoteClick(event){
    event.preventDefault();
    this.props.actions.viewDownvoteAction(this.props.viewRecipe.id, this.props.user.userId)
  }

  /**
   * @description - gets view recipe details
   * @return {void} no return or void
   */
  componentDidMount() {
    const recipeId = Number(location.search.split('=')[1].replace("&page", ""))
    this.props.actions.viewRecipeAction(recipeId);
  }

  /**
   *@description render - renders the class component
   * @return {object} returns an object
   */
  render() {
    return (
      <div>
        <Header />
        {this.renderRecipe()}
        <Footer />
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
    viewRecipe: state.recipe.viewRecipe,
    user: state.auth.user.currentUser
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
      viewRecipeAction,
      viewUpvoteAction, 
      viewDownvoteAction
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewRecipe)
