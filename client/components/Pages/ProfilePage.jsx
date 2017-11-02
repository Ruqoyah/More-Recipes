import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { getUserProfileAction, editProfileAction } from '../../actions/auth_actions';
import Header from '../Common/Header';
import Footer from '../Common/Footer';

class ProfilePage extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      password: '',
      confirmPassword: '',
      fullName : '',
      username: '',
      email: '',
      isLoading: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){
    const userId = this.props.userId;
    this.props.actions.getUserProfileAction(userId)
  }

  componentWillReceiveProps(props) {
    this.setState({
      fullName : props.fullName,
      username: props.username,
      email: props.email,
    });
  }

  onChange(event) {
    const eventName = event.target.name;
    const eventValue = event.target.value;
    this.setState({[eventName]: eventValue});
  }


  onSubmit(e) {
    e.preventDefault();
    let newState = this.state;
    if (this.state.password === ''){
      newState = {
        username: this.state.username,
        email: this.state.email,
        fullName: this.state.fullName
      } 
    } 

    this.setState({ isLoading: true })
    const userId = this.props.userId
    this.props.actions.editProfileAction(userId, newState)
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
      .catch((error) => console.log('Hello error'))
  }


  render() {
    const fullName = this.state.fullName;
    const username = this.state.username;
    const email = this.state.email;
    const confirmPassword = this.state.confirmPassword;
    const password = this.state.password;

    return (
      <div>
        <Header />
        <div className="container">
          <div className="row my-2">
            <div className="col-lg-4 order-lg-1 text-center">
              <img src="//placehold.it/300" className="mx-auto img-fluid img-circle d-block"
                alt="avatar" />
              <h6 className="mt-2">Upload a different photo</h6>
              <label className="custom-file">
                <input type="file" id="file" className="custom-file-input" />
                <span className="custom-file-control">Choose file</span>
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
                      <label className="col-lg-3 col-form-label form-control-label"><strong>Password</strong></label>
                      <div className="col-lg-9">
                        <input 
                          className="form-control"
                          type="password" 
                          name="password" 
                          onChange={this.onChange}/>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label form-control-label"><strong>Confirm password</strong></label>
                      <div className="col-lg-9">
                        <input 
                          className="form-control" 
                          type="password" 
                          name="confirmPassword" 
                          onChange={this.onChange}/>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label form-control-label"></label>
                      <div className="btn-toolbar">
                      <div className="col-lg-9">
                        <input type="reset" className="btn btn-secondary" value="Cancel" />
                        <button className="btn btn-primary" type="submit" name="submit"
                        disabled={this.state.isLoading}>Save Changes</button>
                      </div>
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
    fullName: user.fullName,
    username: user.username, 
    email: user.email,

  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({
      getUserProfileAction,
      editProfileAction
    }, dispatch)
  }
}

ProfilePage.propTypes = {
  userId: PropTypes.number,
  fullName: PropTypes.string,
  username: PropTypes.string,
  email: PropTypes.string,
}


ProfilePage.defaultProps = {
  userId: 0,
  fullName : '',
  username: '',
  email: '',
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
