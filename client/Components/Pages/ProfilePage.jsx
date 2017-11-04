import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { getUserProfileAction, editProfileAction, saveProfileImage } from '../../Actions/AuthActions';
import Header from '../Common/Header';
import Footer from '../Common/Footer';

class ProfilePage extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      fullName : '',
      username: '',
      email: '',
      picture: '',
      isLoading: '',
      imageHeight: 0,
      imageWidth: 0,
      image: '',
      imageError: '',
      imageErrorStatus: false
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.uploadImage = this.uploadImage.bind(this)
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

  onChange(event) {
    const eventName = event.target.name;
    const eventValue = event.target.value;
    this.setState({[eventName]: eventValue});
  }


  onSubmit(event) {
    event.preventDefault();
    if(this.state.imageHeight < 200 || this.state.imageWidth < 200) {
      this.setState({imageErrorStatus: true, imageError: 'Image is too small'});
    } else {
      this.props.actions.saveProfileImage(this.state.image)
      .then(() => {
        this.setState({isLoading: true, picture: this.props.imageUrl})
        const userId = this.props.userId
        this.props.actions.editProfileAction(userId, this.state)
        .then((data) => {
          toastr.options = {
            "debug": false,
            "positionClass": "toast-top-full-width",
            "timeOut": "2000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
          };
          toastr.options.onHidden = function() { 
            window.location.href = '/profilepage'
            }
          toastr.success('You successfully edit your profile');
        })
      })
      .catch((error) => {
        console.log(error);
      })
    }
  }

  componentDidMount(){
    const userId = this.props.userId;
    this.props.actions.getUserProfileAction(userId)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      fullName : nextProps.fullName,
      username: nextProps.username,
      email: nextProps.email,
      picture: nextProps.imageDetails
    });
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
          <div className="row my-2">
            <div className="col-lg-4 order-lg-1 text-center">
              <img src={picture} className="mx-auto img-fluid img-circle d-block"
                alt="picture" /><hr/>
             <label className="custom-file">
                  <input type="file" className="form-control-file" id="exampleInputFile" aria-describedby="fileHelp"
                    onChange={this.uploadImage} />
              </label>
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
                        {username}
                      </p>
                      <h6><strong>Full Name</strong></h6>
                      <p>
                      {fullName}
                      </p>
                      <h6><strong>Email</strong></h6>
                      <p>
                      {email}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="tab-pane" id="edit">
                  <form role="form" onSubmit={this.onSubmit} >
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label form-control-label"><strong>Full Name</strong></label>
                      <div className="col-lg-9">
                        <input
                          className="form-control"
                          type="text" 
                          name="fullName"
                          value={this.state.fullName}
                          onChange={this.onChange} />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label form-control-label"><strong>Email</strong></label>
                      <div className="col-lg-9">
                        <input
                          className="form-control"
                          type="email"
                          name="email"
                          value={this.state.email} 
                          onChange={this.onChange}/>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label form-control-label"><strong>Username</strong></label>
                      <div className="col-lg-9">
                        <input 
                          className="form-control" 
                          type="text" 
                          name="username" 
                          value={this.state.username}
                          onChange={this.onChange}/>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label form-control-label"></label>
                      <div className="btn-toolbar">
                        <button className="btn btn-primary" type="submit" name="submit"
                        disabled={this.state.isLoading}>Save Changes</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>);
  }
}

function mapStateToProps(state) {
  const user = state.auth.userProfile;
  return {
    userId: state.auth.user.currentUser.userId,
    imageUrl: state.auth.imageDetails,
    fullName: user.fullName,
    username: user.username, 
    email: user.email,
    picture: user.picture
  }
}

function mapDispatchToProps(dispatch){
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


ProfilePage.defaultProps = {
  userId: 0,
  fullName : '',
  username: '',
  email: '',
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
