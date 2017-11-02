import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../Common/Header';
import { addRecipeAction, getAllRecipeAction } from '../../actions/recipes_action';
import AllRecipes from '../Include/AllRecipes';
import Footer from '../Common/Footer';

class RecipePage extends Component {
  constructor(props) {
    super(props);
    const { userId } = this.props.user;
    this.state = {
      recipeName: '',
      userId,
      ingredient: '',
      details: '',
      picture: 'http://localhost:8000/images/dessert%20salad.png',
      addRecipe: false,
      displayRecipe: true
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.addRecipe = this.addRecipe.bind(this)
  }

  onChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    })
  }

  addRecipe() {
    this.setState({
      displayRecipe: false,
      addRecipe: true
    })
  }

  onSubmit() {
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
        toastr.success('Recipe added successfully');
      })
  }

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
        {
          this.state.addRecipe &&
          <div className="container-fluid" style={{ width: 500}}>
              <form name="add_recipe" onSubmit={this.onSubmit}>
                <div className="post-form">
                  <h4 >Food Name</h4>
                  <input name="recipeName" onChange={this.onChange} className="form-control is-valid" required /> <br />
                  <h4>Ingredients</h4>
                  <textarea name="ingredient" onChange={this.onChange} required></textarea>
                  <h4>Cooking direction</h4>
                  <textarea name="details" onChange={this.onChange} required></textarea>
                </div>
                <label className="custom-file">
                  <input name="picture" type="file" id="file2" className="custom-file-input"
                    onChange={this.onChange} />
                  <span className="custom-file-control">Upload Picture</span>
                </label>
                <div className="input-group">
                  <button type="submit" className="btn btn-outline-danger">Add new Recipe</button>
                </div>
              </form>
            </div>
        }
        {
          this.state.displayRecipe &&
        <div>
        <div style={{ textAlign: 'center', alignItems: 'center', margin: 20 }}>
        <button className="btn btn-outline-danger btn-lg" onClick={this.addRecipe}>Add new Recipe
        <i className="fa fa-plus" aria-hidden="true"></i></button>
        </div>
        {this.renderRecipe()}
        </div>
        }
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
