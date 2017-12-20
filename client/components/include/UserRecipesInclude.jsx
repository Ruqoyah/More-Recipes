import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import sweetalert from 'sweetalert';
import {
  deleteRecipeAction,
  editRecipeAction,
  saveImageToCloud
} from '../../actions/recipesActions';
import { check, toastrOption } from '../../helper';
import Loader from '../common/Loader';
import VoteAndFavoriteIcon from '../common/VoteAndFavoriteIcon';

/**
 * @class MyRecipes
 *
 * @classdesc get user recipes and allow user to edit or delete recipes
 *
 */
class UserRecipesInclude extends Component {
  /**
   * constructor - contains the constructor
   *
   * @param  {object} props the properties of the class component
   *
   * @return {void} no return or void
   */
  constructor(props) {
    super(props);
    this.state = {
      recipeName: this.props.recipeName,
      ingredient: this.props.ingredient,
      details: this.props.details,
      picture: this.props.picture,
      editRecipe: false,
      displayRecipe: true,
      imageHeight: 0,
      imageWidth: 0,
      image: '',
      imageError: '',
      imageErrorStatus: false,
      loading: false,
      redirectOnClick: false
    };
    this.editClick = this.editClick.bind(this);
    this.backClick = this.backClick.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.handleViewClick = this.handleViewClick.bind(this);
  }

  /**
   * @description - handles the onchange event
   *
   * @param  {object} event the event for the content field
   *
   * @return {void}
   *
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @description - handles the view click event
   *
   * @param  {object} event the event for the content field
   *
   * @return {void} no return or void
   *
   */
  handleViewClick(event) {
    event.preventDefault();
    this.setState({ redirectOnClick: true });
  }

  /**
   * @description - handles delete recipe
   *
   * @param  {object} event the event for the content field
   *
   * @return {void} no return or void
   *
   */
  onClick() {
    sweetalert({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this recipe!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.props.actions.deleteRecipeAction(this.props.id)
            .then(() => {
              sweetalert("Poof! Your recipe has been deleted!", {
                icon: "success",
              });
            });
        } else {
          sweetalert("Your recipe is safe!");
        }
      });
  }

  /**
   * @description - view edit recipe form
   *
   * @return {void} no return or void
   *
   */
  editClick() {
    this.setState({
      displayRecipe: false,
      editRecipe: true
    });
  }

  /**
   * @description - view my recipe page
   *
   * @return {void} no return or void
   *
   */
  backClick() {
    this.setState({
      displayRecipe: true,
      editRecipe: false
    });
  }

  /**
   * @description - handles the onFocus event
   *
   * @param  {object} event the event for the content field
   *
   * @return {void} no return or void
   *
   */
  onFocus(event) {
    this.setState({
      imageErrorStatus: false,
      imageError: ''
    });
  }

  /**
   * @description - handles the upload image event
   *
   * @param  {object} event the event for the content field
   *
   * @return {void} no return or void
   *
   */
  uploadImage(event) {
    event.preventDefault();
    let name = event.target.files[0];
    let fileReader = new FileReader();
    if (name) {
      fileReader.onload = () => {
        const newImage = new Image();
        newImage.src = fileReader.result;
        newImage.onload = () => {
          this.setState({
            imageHeight: newImage.height,
            imageWidth: newImage.width,
            image: name
          });
        };
      };
    }
    fileReader.readAsDataURL(name);
  }

  /**
   * @description - handles the edit recipes and image
   *
   * @param  {object} event the event for the content field
   *
   * @return {void} no return or void
   */
  onSubmit(event) {
    event.preventDefault();
    const recipeName = this.state.recipeName;
    const details = this.state.details;
    const ingredient = this.state.ingredient;
    if (check(recipeName, details, ingredient)) {
      toastrOption();
      toastr.error('All field are required');
    } else if (!this.state.image) {
      this.props.actions.editRecipeAction(this.props.id, this.state)
        .then((message) => {
          this.setState({
            loading: false,
            imageErrorStatus: false
          });
          toastrOption();
          toastr.success(message);
          setTimeout(() => {
            this.setState({
              displayRecipe: true,
              editRecipe: false
            });
          }, 3000);
        })
        .catch(message => {
          toastrOption();
          toastr.error(message);
        });
    } else if (this.state.image) {
      this.setState({ picture: this.props.imageUrl });
      //Check File size
      if (this.state.imageHeight < 200 || this.state.imageWidth < 200) {
        this.setState({
          loading: false,
          imageError: 'Image dimension too small.',
          imageErrorStatus: true
        });
      } else {
        this.setState({
          loading: true
        });
        this.props.actions.saveImageToCloud(this.state.image)
          .then(() => {
            this.setState({
              loading: false,
              picture: this.props.imageUrl
            });
            this.props.actions.editRecipeAction(this.props.id, this.state)
              .then((message) => {
                this.setState({
                  loading: false,
                  imageErrorStatus: false
                });
                toastrOption();
                toastr.success(message);
                setTimeout(() => {
                  this.setState({
                    displayRecipe: true,
                    editRecipe: false
                  });
                }, 3000);
              });
          })
          .catch(message => {
            toastrOption();
            toastr.error(message);
          });
      }
    }
  }

  /**
   * @description render - renders the class component
   *
   * @return {object} returns an object
   *
   */
  render() {
    return (
      this.state.redirectOnClick ?
        <Redirect to = {`/recipes/${this.props.id}`}/> :
        <div className="col-sm-3">
          {
            this.state.editRecipe &&
        <form name="add_recipe"
          onSubmit={this.onSubmit}>
          <div
            className="post-form">
            <h4>Food Name</h4>
            <input
              name="recipeName"
              className="form-control is-valid"
              defaultValue={this.state.recipeName}
              onChange={this.onChange}
              required /> <br />
            <h4>Ingredients</h4>
            <textarea
              name="ingredient"
              defaultValue={this.state.ingredient}
              onChange={this.onChange}
              required />
            <h4>Cooking direction</h4>
            <textarea
              name="details"
              defaultValue={this.state.details}
              onChange={this.onChange}
              required />
          </div>
          <label
            className="custom-file">
            <input
              type="file"
              className="form-control-file"
              id="exampleInputFile"
              aria-describedby="fileHelp"
              defaultValue={this.state.picture}
              onFocus={this.onFocus}
              onChange={this.uploadImage}
              accept=".jpg, .jpeg, .png" />
          </label>
          {
            this.state.loading ?
              <Loader size={'36px'}/> :
              null
          }
          <div
            className="row invalid-feedback"
            style={{ paddingBottom: '15px', paddingLeft: '15px' }}>
            {
              this.state.imageErrorStatus ?
                this.state.imageError :
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
                className="btn btn-outline-success">Save
              </button>
            </div>
          </div>
        </form>
          }
          {
            this.state.displayRecipe &&
        <div className="card">
          <div>
            <img
              src={`http://res.cloudinary.com/${process.env.CLOUD_NAME}/image/upload/c_fill,h_200,w_302/${this.props.picture}`}
            />
          </div>
          <div
            className="card-body">
            <h4
              className="card-title ellipses">
              {this.props.recipeName}
            </h4>
            <p
              className="card-text ellipses">
              {this.props.details}
            </p>
            <button
              onClick={this.handleViewClick}
              className="btn btn-success">Read more
            </button>
            <VoteAndFavoriteIcon
              id={this.props.id}
              upvotes={this.props.upvotes}
              downvotes={this.props.downvotes}
              userId={this.props.userId}/>
            <hr/>
            <div
              className="btn-toolbar">
              <button
                onClick={this.editClick}
                className="btn btn-outline-primary">Edit
              </button>
              <button
                onClick={this.onClick}
                className="btn btn-outline-danger">Delete
              </button>
            </div>
          </div>
        </div>
          }
        </div>);
  }
}

/**
 * @description mapStateToProps - maps state value to props
 *
 * @param  {object} state the store state
 *
 * @return {Object} returns state object
 *
 */
function mapStateToProps(state) {
  return {
    user: state.auth.user.currentUser,
    imageUrl: state.recipe.imageDetails
  };
}

/**
 * @description mapDispatchToProps - maps dispatch to props value
 *
 * @param  {Function} dispatch dispatchs function
 *
 * @return {Object} returns an Object
 *
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      editRecipeAction,
      deleteRecipeAction,
      saveImageToCloud
    }, dispatch)
  };
}

UserRecipesInclude.propTypes = {
  id: PropTypes.number,
  imageUrl: PropTypes.string,
  recipeName: PropTypes.string,
  ingredient: PropTypes.string,
  details: PropTypes.string,
  picture: PropTypes.string,
  actions: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRecipesInclude);
