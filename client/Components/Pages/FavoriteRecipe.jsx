import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getFavoriteAction } from '../../Actions/RecipesActions';
import FavoriteRecipes from '../Include/FavoriteRecipes';
import Header from '../Common/Header';
import Footer from '../Common/Footer';

class FavoriteRecipe extends Component {

  renderRecipe() {
    const allRecipes = this.props.favoriteRecipes;
    if (allRecipes.length < 1) {
      return (<div style={{ textAlign: 'center' }}><h3> No Recipe was found </h3></div>)
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

  componentDidMount() {
    this.props.actions.getFavoriteAction(this.props.user.userId)
  }

  render() {
    const recipeCount = this.props.favoriteRecipes.length;
    return (
      <div>
        <Header /> 
        {this.renderRecipe()}
        {(recipeCount > 12 
          ?
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className="page-item disabled">
                <a className="page-link" href="#" tabIndex="-1">Previous</a>
              </li>
              <li className="page-item"><a className="page-link" href="#">1</a></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item">
                <a className="page-link" href="#">Next</a>
              </li>
            </ul>
          </nav>
          :
          ''
        )}
        <Footer />
      </div>);
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user.currentUser,
    favoriteRecipes: state.recipe.favoriteRecipes
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getFavoriteAction
    }, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(FavoriteRecipe);
