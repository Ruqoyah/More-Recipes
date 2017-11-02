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
  
  constructor(props) {
    super(props);
    const { userId } = this.props.user;
    this.state = {
      recipeName: '',
      userId,
      ingredient: '',
      details: '',
      picture: 'http://localhost:8000/images/dessert%20salad.png'
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.renderRecipe = this.renderRecipe.bind(this);
  }

  onChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    })
  }

  renderRecipe() {
    const allUserRecipe = this.props.userRecipe;
    if (allUserRecipe.length < 1) {
      return '';
    }
    return (<div>
      {
        allUserRecipe.map((recipe) => {
          return (
            <MyRecipes
              picture={recipe.picture}
              recipeName={recipe.recipeName}
              details={recipe.details}
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
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <form name="add_recipe" onSubmit={this.onSubmit}>
                <div className="post-form">
                  <h4 >Recipe Name</h4>
                  <input name="recipeName" onChange={this.onChange} className="form-control is-valid" required /> <br />
                  <h4>Ingredients</h4>
                  <textarea name="ingredient" onChange={this.onChange} required></textarea>
                  <h4>Details</h4>
                  <textarea name="details" onChange={this.onChange} required></textarea>
                </div>
                <label className="custom-file">
                  <input name="picture" type="file" id="file2" className="custom-file-input"
                    onChange={this.onChange} />
                  <span className="custom-file-control">Upload Picture</span>
                </label>
                <div className="input-group">
                  <button type="submit" className="btn btn-outline-danger btn-lg">Post</button>
                </div>
              </form>
            </div>
            <div className="col">
              {this.renderRecipe()}
            </div>
          </div>
        </div>
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
