import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../Common/Header';
import { getAllRecipeAction } from '../../actions/recipes_action';
import AllRecipes from '../Include/AllRecipes';
import Footer from '../Common/Footer';

class RecipePage extends Component {
  
  renderRecipe() {
    const allRecipes = this.props.recipes;
    if (allRecipes.length < 1) {
      return (<div style={{ backgroundColor: '#fff', textAlign: 'center' }}><h3> No Recipe was found </h3></div>)
    }
    return (<div className="row">
      {
        allRecipes.map((recipe) => {
          return ( 
            <AllRecipes
              picture={recipe.picture}
              recipeName={recipe.recipeName}
              ingredients={recipe.ingredients}
              details={recipe.details}
              views={recipe.views}
              upvotes={recipe.upvotes}
              downvotes={recipe.downvotes}
              id={recipe.id}
              key={Math.random() * 10}
            />
          )
        })
      }
      </div>)
  }

  componentDidMount() {
    this.props.actions.getAllRecipeAction(this.props.recipes)
  }

  render() {
    const recipeCount = this.props.recipes.length;
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

export default connect(mapStateToProps, mapDispatchToProps)(RecipePage);
