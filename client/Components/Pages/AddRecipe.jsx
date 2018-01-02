import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { check, toastrOption } from '../../Helper/index';
import { addRecipeAction, saveImageToCloud } from '../../Actions/RecipesActions';
import Header from '../Common/Header';
import Footer from '../Common/Footer';


/**
 * @class AddRecipe
 *
 * @classdesc Addrecipe component
 *
 */
class AddRecipe extends Component {
  /**
   * constructor - contains the constructor
   *
   * @param  {object} props the properties of the class component
   *
   * @return {void} no return or void
   *
   */
  constructor(props) {
    super(props);
    this.state = {
      recipeName: '',
      ingredient: '',
      details: '',
      image: '',
      imageHeight: 0,
      imageWidth: 0,
      imageError: '',
      imageErrorStatus: false,
      picture: '',
      loading: false,
      redirect: false
    };
    this.onChange = this.onChange.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
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
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
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
   * @description - redirect to recipes page
   *
   * @return {void} no return or void
   */
  onClick() {
    this.setState({
      redirect: true
    });
  }

  /**
   * @description - handles the add recipes and upload image
   *
   * @param  {object} event the event for the content field
   *
   * @return {void} no return or void
   */
  handleSubmit(event) {
    event.preventDefault();
    const recipeName = this.state.recipeName;
    const details = this.state.details;
    const ingredient = this.state.ingredient;
    if (check(recipeName, details, ingredient)) {
      toastrOption();
      toastr.error('All field are required');
    } else if (!this.state.image) {
      this.setState({
        imageErrorStatus: true,
        imageError: 'No Image provided'
      });
    } else if (this.state.imageHeight < 200 ||
      this.state.imageWidth < 200) {
      this.setState({
        imageErrorStatus: true,
        imageError: 'Image is too small'
      });
    } else {
      this.setState({
        loading: true
      });
      this.props.actions.saveImageToCloud(this.state.image)
        .then(() => {
          if (this.state.image !== '') {
            // If the state image is not empty, save recipe to database
            this.setState({
              loading: false,
              picture: this.props.imageUrl
            });
            addRecipeAction(this.state)
              .then((message) => {
                toastrOption();
                toastr.success(message);
                setTimeout(() => {
                  this.setState({
                    redirect: true
                  });
                }, 3000);
              })
              .catch(message => {
                toastrOption();
                toastr.error(message);
              });
          }
        });
    }
  }

  /**
   * @description render - renders the class component
   *
   * @return {object} returns an object
   */
  render() {
    return (
      this.state.redirect ?
        <Redirect to ="/user/recipes"/> :
        <div >
          <Header />
          <div className="container-fluid add-form">
            <form
              name="add_recipe"
              onSubmit={this.handleSubmit}>
              <div
                className="post-form">
                <h4 >Food Name</h4>
                <input
                  name="recipeName"
                  onChange={this.onChange}
                  className="form-control is-valid"
                  required /><br/>
                <h4>Ingredients</h4>
                <div>
                  <textarea
                    name="ingredient"
                    onChange={this.onChange}
                    required />
                </div><br/>
                <h4>Cooking direction</h4>
                <div>
                  <textarea
                    name="details"
                    onChange={this.onChange}
                    required />
                </div><br/>
              </div>
              <label
                className="custom-file">
                <input
                  type="file"
                  className="form-control-file"
                  id="exampleInputFile"
                  aria-describedby="fileHelp"
                  onFocus={this.onFocus}
                  onChange={this.uploadImage}
                  accept=".jpg, .jpeg, .png" />
              </label>
              {
                this.state.loading ?
                  <i
                    className="fa fa-circle-o-notch fa-spin"
                    style={{ fontSize: '36px', color: '#FFA500' }} /> :
                  null
              }
              <div
                className="row invalid-feedback"
                style={{ paddingBottom: '5px' }}>
                {
                  this.state.imageErrorStatus ?
                    this.state.imageError :
                    null
                }
              </div>
              <div className="btn-toolbar add-form-button">
                <button type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal" id="reset"
                  onClick={this.onClick}>Cancel</button>
                <button type="submit" className="btn btn-outline-danger">Add Recipe</button>
              </div>
            </form>
          </div>
          <Footer />
        </div>
    );
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
    imageUrl: state.recipe.imageDetails
  };
}

/**
 * mapDispatchToProps - maps dispatch to props value
 *
 * @param  {Function} dispatch dispatchs function
 *
 * @return {Object} returns an Object
 *
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      saveImageToCloud
    }, dispatch)
  };
}

AddRecipe.propTypes = {
  imageUrl: PropTypes.string,
  actions: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRecipe);
