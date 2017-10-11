import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { viewRecipeAction } from '../../actions/recipes_action';
import Header from '../Common/Header';
import ViewRecipes from '../Include/ViewRecipes';

class ViewRecipe extends Component {
  renderRecipe() {
    const recipeData = [];
    let viewRecipe = this.props.viewRecipe;
    recipeData.push(viewRecipe);
    return (<div>
      {
        recipeData.map((recipe) => {
          return ( 
            <ViewRecipes
              picture={recipe.picture}
              recipeName={recipe.recipeName}
              ingredient={recipe.ingredient}
              details={recipe.details}
              votes={recipe.votes}
              views={recipe.views}
              review={recipe.Reviews}
              id={recipe.id}
              key={Math.random() * 10}
            />
          )
        })
      }
      </div>) 
  }

  componentDidMount() {
    const recipeId = location.search.split('=')[1];
    this.props.actions.viewRecipeAction(recipeId);
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderRecipe()}
      </div>);
  }
}

function mapStateToProps(state) {
  console.log(state.recipe.viewRecipe)
  return {
    viewRecipe: state.recipe.viewRecipe,
    user: state.auth.user.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      viewRecipeAction
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewRecipe)
