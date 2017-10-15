import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addRecipeAction, getUserRecipeAction } from '../../actions/recipes_action';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import MyRecipes from '../Include/MyRecipes';



class AddRecipe extends Component {
  renderRecipe() {
    const allUserRecipe = this.props.userRecipe;
    if (allUserRecipe.length < 1) {
      return '';
    }
    return (<div className="row">
      {
        allUserRecipe.map((recipe) => {
          return (
            <MyRecipes
              picture={recipe.picture}
              recipeName={recipe.recipeName}
              ingredient={recipe.ingredient}
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

  onSubmit(e) {
    e.preventDefault();
    addRecipeAction(this.state)
      .then((recipe) => {
        toastr.options = {
          "debug": false,
          "positionClass": "toast-top-full-width",
          "timeOut": "2000",
          "showEasing": "swing",
          "hideEasing": "linear",
          "showMethod": "fadeIn",
          "hideMethod": "fadeOut"
        };
        toastr.options.onHidden = function () {
          window.location.href = '/addrecipe'
        }
        toastr.success('Recipe added successfully');
      })
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
