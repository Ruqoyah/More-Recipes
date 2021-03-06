import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { toastrOption } from '../../helper';
import {
  editProfileAction,
  saveProfileImage
} from '../../actions/authActions';
import Loader from '../common/Loader';
/**
 * @class ProfilePage
 *
 * @classdesc get user Profile and allow user to edit profile
 *
 */
export class ProfilePageInclude extends Component {
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
      userDetails: this.props.usersTempDetails,
      imageHeight: 0,
      imageWidth: 0,
      image: '',
      imageError: '',
      imageErrorStatus: false,
      loading: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
  }

  /**
   * @description - receive user details and set it to state userDetails
   *
   * @param {object} nextProps
   *
   * @return {void} no return or void
   *
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.user.id) {
      this.setState({
        userDetails: nextProps.user
      });
    }
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
    let temp = this.state.userDetails;
    temp[event.target.name] = event.target.value;
    this.setState({ userDetails: temp });
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
   * @description - handles the edit profile and upload image
   *
   * @param  {object} event the event for the content field
   *
   * @return {void} no return or void
   *
   */
  onSubmit(event) {
    event.preventDefault();
    const fullName = this.state.userDetails.fullName;
    const username = this.state.userDetails.username;
    if (fullName.trim() === '' || username.trim() === '') {
      return toastr.error('All field are required');
    }
    if (!this.state.image) {
      this.props.actions.editProfileAction(this.state.userDetails)
        .then((message) => {
          this.setState({
            loading: false,
            imageErrorStatus: false
          });
          toastrOption();
          toastr.success(message);
        })
        .catch(message => {
          toastrOption();
          toastr.error(message);
        });
    } else if (this.state.image) {
      this.setState({
        userDetails: {
          ...this.state.userDetails,
          picture: this.props.imageUrl
        }
      });
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
        this.props.actions.saveProfileImage(this.state.image)
          .then(() => {
            this.setState({
              loading: false,
              userDetails: {
                ...this.state.userDetails,
                picture: this.props.imageUrl
              }
            });
            this.props.actions.editProfileAction(this.state.userDetails)
              .then((message) => {
                this.setState({
                  loading: false,
                  imageErrorStatus: false
                });
                toastrOption();
                toastr.success(message);
              })
              .catch(message => {
                toastrOption();
                toastr.error(message);
              });
            this.setState({
              image: ''
            });
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
      <div
        className="tab-pane"
        id="edit">
        {
          <form
            role="form"
            className="profile-editing"
            onSubmit={this.onSubmit} >
            <div
              className="form-group row">
              <label
                className="col-lg-3 col-form-label form-control-label">
                <strong>Full Name</strong>
              </label>
              <div
                className="col-lg-9">
                <input
                  className="form-control"
                  type="text"
                  name="fullName"
                  id="profile-fullname"
                  value={this.state.userDetails.fullName}
                  onChange={this.onChange}
                  required />
              </div>
            </div>
            <div
              className="form-group row">
              <label
                className="col-lg-3 col-form-label form-control-label">
                <strong>Email</strong>
              </label>
              <div
                className="col-lg-9">
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  id="profile-email"
                  value={this.state.userDetails.email}
                  onChange={this.onChange}
                  required />
              </div>
            </div>
            <div
              className="form-group row">
              <label
                className="col-lg-3 col-form-label form-control-label">
                <strong>Username</strong>
              </label>
              <div
                className="col-lg-9">
                <input
                  className="form-control"
                  type="text"
                  name="username"
                  id="profile-username"
                  value={this.state.userDetails.username}
                  onChange={this.onChange}
                  required />
              </div>
            </div>
            <div>
              <div
                className="form-group row">
                <label
                  className="col-lg-3 col-form-label form-control-label">
                  <strong>Picture</strong>
                </label>
                <label
                  className="custom-file">
                  <input
                    type="file"
                    className="form-control-file"
                    id="exampleInputFile"
                    aria-describedby="fileHelp"
                    onFocus={this.onFocus}
                    onChange={this.uploadImage}
                    style={{ marginLeft: "17px" }}
                    accept=".jpg, .jpeg, .png" />
                </label>
                {
                  this.state.loading ?
                    <Loader size={'36px'}/> :
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
              </div>
            </div>
            <div
              className="form-group row">
              <label
                className="col-lg-3 col-form-label form-control-label" />
              <div
                className="btn-toolbar">
                <button
                  className="btn btn-outline-danger"
                  type="submit"
                  name="submit"
                  id="save-changes"
                  style={{ marginLeft: '18px' }}>Save Changes
                </button>
              </div>
            </div>
          </form>
        }
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
  const tempUserDetails = {
    fullName: '',
    id: '',
    picture: '',
    username: '',
    email: ''
  };
  return {
    usersTempDetails: tempUserDetails,
    imageUrl: state.auth.imageDetails,
    user: state.auth.userProfile
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
      editProfileAction,
      saveProfileImage
    }, dispatch)
  };
}

ProfilePageInclude.propTypes = {
  imageUrl: PropTypes.string,
  actions: PropTypes.object,
  user: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePageInclude);
