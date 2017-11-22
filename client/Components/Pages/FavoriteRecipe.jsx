import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getFavoriteAction } from '../../Actions/RecipesActions';
import FavoriteRecipes from '../Include/FavoriteRecipes';
import Header from '../Common/Header';
import Footer from '../Common/Footer';

/**
 * @class FavoriteRecipe
 * @classdesc favorite recipe component
 */
class FavoriteRecipe extends Component {

  /**
   * @description render - renders favorite recipe details
   * @return {object} returns an object
   */
  renderRecipe() {
    const allRecipes = this.props.favoriteRecipes;
    if (allRecipes.length < 1) {
      return (
        <div style={{ textAlign: 'center' }}>
          <h3> No Recipe was found </h3>
        </div>
      )
    }
    return (<div className="row">
      {
        allRecipes.map((recipe) => {
          return ( 
            <FavoriteRecipes
              picture={recipe.Recipe.picture}
              recipeName={recipe.Recipe.recipeName}
              ingredient={recipe.Recipe.ingredient}
              details={recipe.Recipe.details}
              upvotes={recipe.Recipe.upvotes}
              downvotes={recipe.Recipe.downvotes}
              views={recipe.Recipe.views}
              username={recipe.Recipe.creator}
              recipeId={recipe.recipeId}
              updatedAt={recipe.Recipe.updatedAt}
              key={Math.random() * 10}
            />
          )
        })
      }
      </div>)
  }

  /**
   * @description - gets favorite recipes 
   * @return {void} no return or void
   */
  componentDidMount() {
    this.props.actions.getFavoriteAction(this.props.user.userId)
  }

  /**
   * @description render - renders the class component
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
    user: state.auth.user.currentUser,
    favoriteRecipes: state.recipe.favoriteRecipes
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
      getFavoriteAction
    }, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(FavoriteRecipe);
