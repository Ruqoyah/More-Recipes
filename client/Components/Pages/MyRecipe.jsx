import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addRecipeAction, getUserRecipeAction } from '../../Actions/RecipesActions';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import MyRecipes from '../Include/MyRecipes';

/**
 * @class MyRecipe
 * @classdesc get user recipes and allow user to edit or delete recipes
 */
class MyRecipe extends Component {

  /**
   * @description render - renders user recipes
   * @return {object} returns an object
   */
  renderRecipe() {
    const allUserRecipe = this.props.userRecipe;
    if (allUserRecipe.length < 1) {
      return (
        <div style={{ textAlign: 'center' }}>
          <h3> No Recipe was found </h3>
        </div>
      );
    }
    return (<div className="row">
      {
        allUserRecipe.map((recipe) => {
          return (
            <MyRecipes
              picture={recipe.picture}
              recipeName={recipe.recipeName}
              ingredient={recipe.ingredient}
              upvotes={recipe.upvotes}
              downvotes={recipe.downvotes}
              views={recipe.views}
              details={recipe.details}
              id={recipe.id}
              key={recipe.id}
            />
          )
        })
      }
      </div>
    )
  }

  /**
   * @description - gets user recipes 
   * @return {void} no return or void
   */
  componentDidMount() {
    this.props.actions.getUserRecipeAction(this.props.user.userId)
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
    userRecipe: state.recipe.userRecipe
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
      getUserRecipeAction
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyRecipe);
