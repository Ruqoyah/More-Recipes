import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addRecipeAction, getUserRecipeAction } from '../../Actions/RecipesActions';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import MyRecipes from '../Include/MyRecipes';



class AddRecipe extends Component {

  renderRecipe() {
    const allUserRecipe = this.props.userRecipe;
    if (allUserRecipe.length < 1) {
      return (<div style={{ backgroundColor: '#fff', textAlign: 'center' }}><h3> No Recipe was found </h3></div>);
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

  componentDidMount() {
    this.props.actions.getUserRecipeAction(this.props.user.userId)
    
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
    user: state.auth.user.currentUser,
    userRecipe: state.recipe.userRecipe
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getUserRecipeAction
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRecipe);
