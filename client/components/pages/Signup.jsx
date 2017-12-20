import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { signUpAction } from '../../actions/authActions';
import {
  userOrEmailExist,
  check,
  toastrOption
} from '../../helper';

/**
 * @class Signup
 *
 * @classdesc register user
 *
 */
export class Signup extends Component {
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
      username: '',
      fullName: '',
      email: '',
      password: '',
      cpassword: '',
      usernameError: '',
      fullNameError: '',
      emailError: '',
      passwordError: '',
      passwordConfirmError: '',
      userExist: '',
      emailExist: '',
      isLoading: false,
      redirectUser: false
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  /**
   * @description - get the background image on this component
   *
   * @return {void} no return or void
   *
   */
  componentDidMount() {  // eslint-disable-line
    document.body.style.backgroundImage = "url(/images/designed.png)";
  }

  /**
   * @description - remove the background when out of this component
   *
   * @return {void} no return or void
   *
   */
  componentWillUnmount() {  // eslint-disable-line
    document.body.style.backgroundImage = "url('')";
  }

  /**
   * @description - handles the onchange event
   *
   * @param  {object} event the event for the content field
   *
   * @return {void}
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * @description - handles the sign up form
   *
   * @param  {object} event the event for the content field
   *
   * @return {void} no return or void
   */
  handleSubmit(event) {
    event.preventDefault();
    const username = this.state.username;
    const fullName = this.state.fullName;
    const password = this.state.password;
    if (check(username, fullName, password)) {
      toastrOption();
      return toastr.error('All field are required');
    }
    this.setState({ isLoading: true });
    this.props.actions.signUpAction(this.state)
      .then((data) => {
        toastrOption();
        toastr.success('You have successfully signed up');
        setTimeout(() => {
          this.setState({ redirectUser: true });
        }, 3000);
      })
      .catch((error) => error);
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
    switch (event.target.name) {
    case 'username':
      this.setState({ usernameError: '', userExist: '' });
      break;
    case 'password':
      this.setState({ passwordError: '' });
      break;
    case 'cpassword':
      this.setState({ passwordConfirmError: '' });
      break;
    case 'email':
      this.setState({ emailError: '', emailExist: '' });
    }
  }

  /**
   * @description - handles the onBlur event
   *
   * @param  {object} event the event for the content field
   *
   * @return {void} no return or void
   *
   */
  onBlur(event) {
    const pass = document.getElementById('validationServer04').value;
    switch (event.target.name) {
    case 'username':
      userOrEmailExist({ username: event.target.value })
        .then((res) => {
          if (res) {
            this.setState({ userExist: 'Username already exist' });
          }
        });
      if (event.target.value.length < 5 || !event.target.value) {
        this.setState({ usernameError: 'Please provide a username with atleast 5 characters' });
        return false;
      } else {
        this.setState({ usernameError: '' });
        return true;
      }
    case 'email':
      userOrEmailExist({ email: event.target.value })
        .then((res) => {
          if (res) {
            this.setState({ emailExist: 'Email already exist' });
          }
        });
    case 'password':
      if (event.target.value.length < 8 || !event.target.value) {
        this.setState({ passwordError: 'Provide a valid password with minimum of 8 characters' });
        return false;
      } else {
        this.setState({ passwordError: '' });
        return true;
      }
    case 'cpassword':
      if (event.target.value !== pass) {
        this.setState({ passwordConfirmError: 'Password does not match' });
        return false;
      } else {
        this.setState({ passwordConfirmError: '' });
        return true;
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
    if (localStorage.token) {
      this.props.history.push('/recipes');
    }
    return (
      this.state.redirectUser ?
        <Redirect to="/recipes"/> :
        <div>
          <div className="header-signup">
            <h4>Signup</h4>
          </div>
          <form onSubmit={this.handleSubmit} className="form">

            <div className="form-group">
              <input
                name="username"
                type="text"
                onBlur={this.onBlur}
                onChange={this.onChange}
                onFocus={this.onFocus}
                className="form-control is-valid"
                id="validationServer01"
                placeholder="Username"
                required />
              <div
                className="invalid-feedback">
                {this.state.usernameError}
              </div>
              <div
                className="invalid-feedback">
                {this.state.userExist}
              </div>
            </div>

            <div
              className="form-group">
              <input
                name="fullName"
                type="text"
                onChange={this.onChange}
                className="form-control is-valid"
                id="validationServer02"
                placeholder="Full Name"
                required />
              <div
                className="invalid-feedback">
                {this.state.fullNameError}
              </div>
            </div>

            <div
              className="form-group">
              <input
                name="email"
                type="email"
                onBlur={this.onBlur}
                onChange={this.onChange}
                onFocus={this.onFocus}
                className="form-control is-valid"
                id="validationServer03"
                placeholder="Email"
                required />
              <div
                className="invalid-feedback">
                {this.state.emailError}
              </div>
              <div
                className="invalid-feedback">
                {this.state.emailExist}
              </div>
            </div>

            <div
              className="form-group">
              <input
                name="password"
                type="password"
                onBlur={this.onBlur}
                onChange={this.onChange}
                onFocus={this.onFocus}
                className="form-control is-valid"
                id="validationServer04"
                placeholder="Password"
                required />
              <div
                className="invalid-feedback">
                {this.state.passwordError}
              </div>
            </div>

            <div
              className="form-group">
              <input
                name="cpassword"
                type="password"
                onBlur={this.onBlur}
                onChange={this.onChange}
                onFocus={this.onFocus}
                className="form-control is-valid"
                id="validationServer05"
                placeholder="Confirm Password"
                required />
              <div
                className="invalid-feedback">
                {this.state.passwordConfirmError}
              </div>
            </div>

            <div
              className="input-group">
              <button
                className="btn btn-outline-danger btn-lg btn-block"
                type="submit"
                name="submit"
                disabled={this.state.isLoading}>Finish
              </button>
            </div>
            <div
              className="join">
              <Link to="/login">Already have an account? Sign in!
              </Link>
            </div>
          </form>
        </div>
    );
  }
}

/**
 * @description mapDispatchToProps - maps dispatch to props value
 *
 * @param  {Function} dispatch dispatchs function
 *
 * @return {Object} returns an Object
 *
 */
export function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      signUpAction
    }, dispatch)
  };
}

Signup.propTypes = {
  actions: PropTypes.object
};

export default connect(null, mapDispatchToProps)(Signup);
