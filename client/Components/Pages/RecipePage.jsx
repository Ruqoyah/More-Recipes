import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { render } from 'react-dom';
import { Link, Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../Common/Header';
import { addRecipeAction, getAllRecipeAction, saveImageToCloud } from '../../Actions/RecipesActions';
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
      picture: '',
      addRecipe: false,
      displayRecipe: true,
      imageHeight: 0,
      imageWidth: 0,
      creator: this.props.user.username,
      image: '',
      imageError: '',
      imageErrorStatus: false,
      loading: false,
      redirectUser: false
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.addRecipe = this.addRecipe.bind(this)
    this.uploadImage = this.uploadImage.bind(this)
    this.backClick = this.backClick.bind(this)
    this.onFocus = this.onFocus.bind(this)
  }

  onChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    })
  }

  uploadImage(event) {
    event.preventDefault();
    let name = event.target.files[0];
    let file_reader = new FileReader();
    if(name) {
      file_reader.onload = () => {
        const newImage = new Image();
        newImage.src = file_reader.result;
        newImage.onload = () => {
          this.setState({
            imageHeight: newImage.height, 
            imageWidth: newImage.width,
            image: name
          });
        }
      }
    }
    file_reader.readAsDataURL(name);
  }

  addRecipe() {
    this.setState({
      displayRecipe: false,
      addRecipe: true
    })
  }

  backClick() {
    this.setState({
      displayRecipe: true,
      addRecipe: false
    })
  }

  onFocus(event) {
    this.setState({
      imageErrorStatus: false,
      imageError: ''
    });
  }

  onSubmit(event) {
    event.preventDefault();
    if(this.state.recipeName.trim() === '' 
    || this.state.details.trim() === '' 
    || this.state.ingredient.trim() === '') {
      toastr.options = {
        "debug": false,
        "timeOut": "2000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      };
      toastr.error('All field are required')
    }
    else if(this.state.imageHeight < 200 || this.state.imageWidth < 200) {
      this.setState({
        imageErrorStatus: true,
        loading: false,
        imageError: 'Image is too small or no Image provided'
      });
    } else {
      this.setState({
        loading: true
      });
      this.props.actions.saveImageToCloud(this.state.image)
      .then(() => {
        if(this.state.image !== '') {
          // If the state image is not empty, save recipe to database
          this.setState({
            loading: false,
            picture: this.props.imageUrl
          });
          this.props.actions.addRecipeAction(this.state)
          .then(() => {
              toastr.options = {
                "debug": false,
                "timeOut": "2000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
              };
              toastr.success('Recipe added successfully');
            })
            setTimeout(() => {
              this.setState({ 
                displayRecipe: true,
                addRecipe: false
              });
            }, 3000)
         }
      })
      .catch((error) => error)
    }
  }

  renderRecipe() {
    const allRecipes = this.props.recipes;
    if (allRecipes.length < 1) {
      return (<div style={{ textAlign: 'center' }}><h3> No Recipe was found </h3></div>)
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
              username={recipe.creator}
              updatedAt={recipe.updatedAt}
              id={recipe.id}
              key={Math.random() * 10}
            />
          )
        })
      }
      </div>)
  }

  componentDidMount() {
    this.props.actions.getAllRecipeAction();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.imageDetails) {
      this.setState({ picture: nextProps.imageDetails });
    }
  }
  render() {
    const recipeCount = this.props.recipes.length;
    return (
      <div>
        <Header /> 
        {
          this.state.addRecipe &&
          <div className="container-fluid" style={{ width: 350}}>
              <form name="add_recipe" onSubmit={this.onSubmit}>
                <div className="post-form">
                  <h4 >Food Name</h4>
                  <input name="recipeName" onChange={this.onChange} className="form-control is-valid" required /> <br />
                  <h4>Ingredients</h4>
                  <textarea name="ingredient" onChange={this.onChange} required></textarea>
                  <h4>Cooking direction</h4>
                  <textarea name="details" onChange={this.onChange} required></textarea>
                </div> <hr/>
                <label className="custom-file">
                  <input type="file" className="form-control-file" id="exampleInputFile" aria-describedby="fileHelp"
                     onFocus={this.onFocus} onChange={this.uploadImage} />
                </label>
                {
                  this.state.loading
                ?
                  <i className="fa fa-circle-o-notch fa-spin" style={{ fontSize: '36px', color: '#FFA500'}}></i>
                :
                  null
                }
                <div className="row invalid-feedback" style={{ paddingBottom: '5px'}}>
                  {
                    this.state.imageErrorStatus 
                  ?
                    this.state.imageError
                  :
                  null
                  }
                </div>
                <div className="input-group">
                <div className="btn-toolbar">
                  <button onClick={this.backClick} className="btn btn-outline-danger">Cancel</button>
                  <button type="submit" className="btn btn-outline-success">Add new Recipe</button>
                </div>
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
    user: state.auth.user.currentUser,
    imageUrl: state.recipe.imageDetails
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      saveImageToCloud,
      addRecipeAction,
      getAllRecipeAction
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipePage);
