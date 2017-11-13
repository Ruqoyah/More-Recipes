import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { getUserProfileAction, editProfileAction, saveProfileImage } from '../../Actions/AuthActions';
import Header from '../Common/Header';
import Footer from '../Common/Footer';

class ProfilePage extends Component {

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
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.uploadImage = this.uploadImage.bind(this)
  }

  uploadImage(event) {
    event.preventDefault();
    let name = event.target.files[0];
    let file_reader = new FileReader();
    if (name) {
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

  onChange(event) {
    const eventName = event.target.name;
    const eventValue = event.target.value;
    let temp = this.state.userDetails;
    temp[eventName] = eventValue;
    this.setState({ userDetails: temp });
  }


  onSubmit(event) {
    event.preventDefault();

    //************************************************************************//
    //*THIS SECTION HANDLES THE EDITING OF PROFILE WITHOUT SELECTING AN IMAGE*//
    //***********************************************************************//
    this.setState({
      imageErrorStatus: false,
      loading: true
    })
    // Edit profile if there is no image selected
    if (!this.state.image) {
      this.props.actions.editProfileAction(this.props.userId, this.state.userDetails).then(() => {
        this.setState({
          loading: false,
          imageErrorStatus: false
        })
        toastr.options = {
          "debug": false,
          "timeOut": "2000",
          "showEasing": "swing",
          "hideEasing": "linear",
          "showMethod": "fadeIn",
          "hideMethod": "fadeOut"
        };
        toastr.success('You successfully edit your profile');
      })
    } else if (this.state.image) {
      this.setState({ userDetails: { ...this.state.userDetails, picture: this.props.imageUrl } });

      //Check File size
      if (this.state.imageHeight < 200 || this.state.imageWidth < 200) {
        this.setState({
          loading: false,
          imageError: 'Image is too small.',
          imageErrorStatus: true,
          disableBtn: false
        });
      } else {
        this.setState({
          loading: true
        })
        this.props.actions.saveProfileImage(this.state.image)
          .then(() => {
            this.setState({ loading: false, userDetails: { ...this.state.userDetails, picture: this.props.imageUrl } });
            this.props.actions.editProfileAction(this.props.userId, this.state.userDetails)
              .then(() => {
                this.setState({
                  loading: false,
                  imageErrorStatus: false
                });
                toastr.options = {
                  "debug": false,
                  "timeOut": "2000",
                  "showEasing": "swing",
                  "hideEasing": "linear",
                  "showMethod": "fadeIn",
                  "hideMethod": "fadeOut"
                };
                toastr.success('You successfully edit your profile');
              })
          })
          .catch((error) => error)
      }
    }
  }

  componentWillMount() {
    this.props.actions.getUserProfileAction(this.props.userId)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.id) {
      this.setState({ userDetails: nextProps.user });
    }
  }


  render() {
    const fullName = this.state.fullName;
    const username = this.state.username;
    const email = this.state.email;
    const picture = this.props.picture;

    return (
      <div>
        <Header />
        <div className="container">
          {
            this.state.redirect
              ?
              <Redirect to="/profilepage" />
              :
              <div className="row my-2">
                <div className="col-lg-4 order-lg-1 text-center">
                  <img src={this.state.userDetails.picture} className="mx-auto img-fluid img-circle d-block"
                    alt="picture" /><hr />
                  <label className="custom-file">
                    <input type="file" className="form-control-file" id="exampleInputFile" aria-describedby="fileHelp"
                      onChange={this.uploadImage} />
                  </label>
                  {
                    this.state.loading
                    ?
                    <i className="fa fa-circle-o-notch fa-spin" style={{ fontSize: '36px', color: '#FFA500' }}></i>
                    :
                    null
                  }
                </div>
                <div className="col-lg-8 order-lg-2">
                  <ul className="nav nav-tabs">
                    <li className="nav-item">
                      <a href="" data-target="#profile" data-toggle="tab" className="nav-link active">Profile</a>
                    </li>
                    <li className="nav-item">
                      <a href="" data-target="#edit" data-toggle="tab" className="nav-link">Edit</a>
                    </li>
                  </ul>
                  <div className="tab-content py-4">
                    <div className="tab-pane active" id="profile">
                      <div className="row">
                        <div className="col-md-6">
                          <h6><strong>Username</strong></h6>
                          <p>
                            {this.state.userDetails.username}
                          </p>
                          <h6><strong>Full Name</strong></h6>
                          <p>
                            {this.state.userDetails.fullName}
                          </p>
                          <h6><strong>Email</strong></h6>
                          <p>
                            {this.state.userDetails.email}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane" id="edit">
                      {<form role="form" onSubmit={this.onSubmit} >
                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label form-control-label"><strong>Full Name</strong></label>
                          <div className="col-lg-9">
                            <input
                              className="form-control"
                              type="text"
                              name="fullName"
                              value={this.state.userDetails.fullName}
                              onChange={this.onChange}
                              required />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label form-control-label"><strong>Email</strong></label>
                          <div className="col-lg-9">
                            <input
                              className="form-control"
                              type="email"
                              name="email"
                              value={this.state.userDetails.email}
                              onChange={this.onChange}
                              required />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label form-control-label"><strong>Username</strong></label>
                          <div className="col-lg-9">
                            <input
                              className="form-control"
                              type="text"
                              name="username"
                              value={this.state.userDetails.username}
                              onChange={this.onChange}
                              required />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label form-control-label"></label>
                          <div className="btn-toolbar">
                            <button className="btn btn-outline-danger" type="submit" name="submit"
                            style={{ marginLeft: '18px'}}
                            disabled={this.state.isLoading}>Save Changes</button>
                          </div>
                        </div>
                      </form>}
                    </div>
                  </div>
                </div>
              </div>
          }
        </div>
        <Footer />
      </div>);
  }
}

function mapStateToProps(state) {
  const tempUserDetails = { fullName: '', id: '', picture: '', username: '', email: '' }
  return {
    usersTempDetails: tempUserDetails,
    imageUrl: state.auth.imageDetails,
    user: state.auth.userProfile,
    userId: state.auth.user.currentUser.userId
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getUserProfileAction,
      editProfileAction,
      saveProfileImage
    }, dispatch)
  }
}

ProfilePage.propTypes = {
  userId: PropTypes.number,
  fullName: PropTypes.string,
  username: PropTypes.string,
  email: PropTypes.string,
  picture: PropTypes.string,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
