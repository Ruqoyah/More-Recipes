import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { viewRecipeAction } from '../../Actions/RecipesActions';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
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
              userId={recipe.userId}
              recipeName={recipe.recipeName}
              ingredient={recipe.ingredient}
              details={recipe.details}
              upvotes={recipe.upvotes}
              downvotes={recipe.downvotes}
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
    const recipeId = Number(location.search.split('=')[1].replace("&page", ""))
    this.props.actions.viewRecipeAction(recipeId);
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderRecipe()}
        <Footer />
      </div>);
  }
}

function mapStateToProps(state) {
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