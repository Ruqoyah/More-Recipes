import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getFavoriteAction } from '../../actions/recipes_action';
import FavoriteRecipes from '../Include/FavoriteRecipes';
import Header from '../Common/Header';

class FavoriteRecipe extends Component {

  renderRecipe() {
    const allRecipes = this.props.favoriteRecipes;
    if (allRecipes.length < 1) {
      return (<div style={{ backgroundColor: '#fff', textAlign: 'center' }}><h3> No Recipe was found </h3></div>)
    }
    return (<div className="row">
      {
        allRecipes.map((recipe) => {
          return ( 
            <FavoriteRecipes
              picture={recipe.Recipe.picture}
              recipeName={recipe.Recipe.recipeName}
              details={recipe.Recipe.details}
              id={recipe.id}
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
        {(recipeCount > 0 
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
