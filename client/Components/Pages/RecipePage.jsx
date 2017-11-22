import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { render } from 'react-dom';
import { Link, Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../Common/Header';
import { addRecipeAction, 
          getAllRecipeAction, 
          saveImageToCloud } from '../../Actions/RecipesActions';
import AllRecipes from '../Include/AllRecipes';
import Footer from '../Common/Footer'; 
import { check } from '../../Helper/index';

/**
 * @class RecipePage
 * @classdesc Recipes page component
 */
class RecipePage extends Component {

  /**
   * constructor - contains the constructor
   * @param  {object} props the properties of the class component
   * @return {void} no return or void
   */
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

  /**
   * @description - handles the onchange event
   * @param  {object} event the event for the content field
   * @return {void}
   */
  onChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    })
  }

  /**
   * @description - handles the upload image event
   * @param  {object} event the event for the content field
   * @return {void} no return or void
   */
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

  /**
   * @description - view add recipe form
   * @return {void} no return or void
   */
  addRecipe() {
    this.setState({
      displayRecipe: false,
      addRecipe: true
    })
  }

  /**
   * @description - view all recipe page 
   * @return {void} no return or void
   */
  backClick() {
    this.setState({
      displayRecipe: true,
      addRecipe: false
    })
  }

  /**
   * @description - handles the onFocus event
   * @param  {object} event the event for the content field
   * @return {void} no return or void
   */
  onFocus(event) {
    this.setState({
      imageErrorStatus: false,
      imageError: ''
    });
  }

  /**
   * @description - handles the add recipes and upload image
   * @param  {object} event the event for the content field
   */
  onSubmit(event) {
    event.preventDefault();
    const recipeName = this.state.recipeName
    const details = this.state.details
    const ingredient = this.state.ingredient
    if(check(recipeName, details, ingredient)) {
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
    else if(!this.state.image) {
      this.setState({
        imageErrorStatus: true,
        loading: false,
        imageError: 'No Image provided'
      });
    }
    else if(this.state.imageHeight < 200 
      || this.state.imageWidth < 200) {
      this.setState({
        imageErrorStatus: true,
        loading: false,
        imageError: 'Image is too small'
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
                addRecipe: false,
                image: '',
              });
            }, 3000)
         }
      })
      .catch((error) => error)
    }
  }

  /**
   * @description render - renders recipe details
   * @return {object} returns an object
   */
  renderRecipe() {
    const allRecipes = this.props.recipes;
    if (allRecipes.length < 1) {
      return (
        <div style={{ textAlign: 'center' }}>
          <h3> No Recipe was found </h3>
        </div>
      )
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

  /**
   * @description - gets all recipes 
   * @return {void} no return or void
   */
  componentDidMount() {
    this.props.actions.getAllRecipeAction();
  }

  /**
   * @description - receive image details and set it to state picture
   * @return {void} no return or void
   */
  componentWillReceiveProps(nextProps) {
    if(nextProps.imageDetails) {
      this.setState({ picture: nextProps.imageDetails });
    }
  }

  /**
   * @description render - renders the class component
   * @return {object} returns an object
   */
  render() {
    return (
      <div>
        <Header /> 
        {
          this.state.addRecipe &&
          <div 
            className="container-fluid" 
            style={{ width: 350}}>
              <form 
                name="add_recipe" 
                onSubmit={this.onSubmit}>
                <div 
                  className="post-form">
                  <h4 >Food Name</h4>
                  <input 
                    name="recipeName" 
                    onChange={this.onChange} 
                    className="form-control is-valid" 
                    required /> <br />
                  <h4>Ingredients</h4>
                  <textarea 
                    name="ingredient" 
                    onChange={this.onChange} 
                    required>
                  </textarea>
                  <h4>Cooking direction</h4>
                  <textarea 
                    name="details" 
                    onChange={this.onChange} 
                    required>
                  </textarea>
                </div> <hr/>
                <label 
                  className="custom-file">
                  <input 
                    type="file" 
                    className="form-control-file" 
                    id="exampleInputFile" 
                    aria-describedby="fileHelp"
                    onFocus={this.onFocus} 
                    onChange={this.uploadImage} 
                    accept=".jpg, .jpeg, .png"/>
                </label>
                {
                  this.state.loading
                ?
                  <i 
                    className="fa fa-circle-o-notch fa-spin" 
                    style={{ fontSize: '36px', color: '#FFA500'}}>
                  </i>
                :
                  null
                }
                <div 
                  className="row invalid-feedback" 
                  style={{ paddingBottom: '5px'}}>
                  {
                    this.state.imageErrorStatus 
                  ?
                    this.state.imageError
                  :
                  null
                  }
                </div>
                <div 
                  className="input-group">
                <div 
                  className="btn-toolbar">
                  <button 
                    onClick={this.backClick} 
                    className="btn btn-outline-danger">Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-outline-success">Add new Recipe
                  </button>
                </div>
                </div>
              </form>
            </div>
        }
        {
          this.state.displayRecipe &&
        <div>
        <div 
          style={{ textAlign: 'center', alignItems: 'center', margin: 20 }}>
        <button 
          className="btn btn-outline-danger btn-lg" 
          onClick={this.addRecipe}>Add new Recipe
          <i 
            className="fa fa-plus" 
            aria-hidden="true">
          </i>
        </button>
        </div>
        {this.renderRecipe()}
        </div>
        }
        <Footer />
      </div>);
  }
}

/**
 * @description mapStateToProps - maps state value to props
 * @param  {object} state the store state
 * @return {Object} returns state object
 */
function mapStateToProps(state) {
  return {
    recipes: state.recipe.recipes,
    user: state.auth.user.currentUser,
    imageUrl: state.recipe.imageDetails
  }
}

/**
 * mapDispatchToProps - maps dispatch to props value
 * @param  {Function} dispatch dispatchs function
 * @return {Object} returns an Object
 */
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
