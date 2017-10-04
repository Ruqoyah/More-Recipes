import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../Common/Header';
import { getAllRecipeAction } from '../../actions/recipes_action';
import AllRecipes from '../Include/AllRecipes';

class RecipePage extends Component {
  
  renderRecipe() {
    console.log(this.props.recipes)
    const allRecipes = this.props.recipes;
    if (allRecipes.length < 1) {
      return <div style={{ backgroundColor: '#fff', marginLeft: '50px', marginRight: '-50px' }}><h2>There is no Recipe in the database</h2></div>;
    }
    return (<div className="row">
      {
        allRecipes.map((recipe) => {
          return ( 
            <AllRecipes
              picture={recipe.picture}
              recipeName={recipe.recipeName}
              details={recipe.details}
              key={recipe.id}
            />
          )
        }
        )
      }
      </div>)
  }

  componentDidMount() {
    this.props.actions.getAllRecipeAction(this.props.user)
  }

  render() {
    return (
      <div>
        <Header /> 
        {this.renderRecipe()}
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
      </div>);
  }
}

function mapStateToProps(state) {
  return {
    recipes: state.recipe.recipes
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
