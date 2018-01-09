import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginAction } from '../../actions/authActions';
import { toastrOption } from '../../helper';

/**
 * @class Login
 *
 * @classdesc login users
 *
 */
export class Login extends Component {
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
      username: '',
      password: '',
      loginError: '',
      redirectUser: false
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  /**
   * @description - get the background image on this component
   *
   * @return {void} no return or void
   *
   */
  componentDidMount() { // eslint-disable-line
    document.body.style.backgroundImage = "url(/images/designed.png)";
    document.body.className = "body-component-b";
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
   * @description - handles the login form
   *
   * @param  {object} event the event for the content field
   *
   * @return {void} no return or void
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.actions.loginAction(this.state)
      .then((message) => {
        toastrOption();
        toastr.success(message);
        setTimeout(() => {
          this.setState({ redirectUser: true });
        }, 3000);
      })
      .catch(message => {
        this.setState({
          loginError: message
        });
      });
  }

  /**
   * @description - handles the onFocus event
   *
   * @param  {object} event the event for the content field
   *
   * @return {void} no return or void
   */
  onFocus(event) {
    switch (event.target.name) {
    case 'username':
      this.setState({ loginError: '' });
      break;
    case 'password':
      this.setState({ loginError: '' });
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
        <div
          id="login-form">
          <div
            className="header-login">
            <h4> Login</h4>
          </div>
          <form
            onSubmit={this.handleSubmit}
            className="form">
            <div
              id="invalid-credential"
              style={{ color: 'red', textAlign: 'center', marginBottom: '12px' }}>
              {this.state.loginError}
            </div>
            <div
              className="form-group">
              <input
                onFocus={this.onFocus}
                name="username"
                type="text"
                className="form-control is-valid"
                onChange={this.onChange}
                id="validationServer01"
                placeholder="Username"
                required/>
            </div>

            <div
              className="form-group">
              <input
                onFocus={this.onFocus}
                name="password" type="password"
                className="form-control is-valid"
                onChange={this.onChange}
                id="validationServer02"
                placeholder="Password"
                required/>
            </div>

            <div
              className="input-group">
              <button
                className="btn btn-outline-success btn-lg btn-block">
              Login
              </button>
            </div>

            <div className="join">
              <Link to="/signup">New to More Recipes? Join Free!
              </Link>
            </div>

          </form>
        </div>);
  }
}

/**
 * @description mapDispatchToProps - maps dispatch to props value
 *
 * @param  {Function} dispatch dispatchs function
 *
 * @return {Object} returns an Object
 */
export function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      loginAction
    }, dispatch)
  };
}

Login.propTypes = {
  actions: PropTypes.object,
  history: PropTypes.object
};


export default connect(null, mapDispatchToProps)(Login);
