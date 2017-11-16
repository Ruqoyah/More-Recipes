import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { loginAction } from '../../Actions/AuthActions';

/**
 * @class Login
 * @classdesc login users
 */
class Login extends Component {
  
   /**
   * constructor - contains the constructor
   * @param  {object} props the properties of the class component
   * @return {void} no return or void
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loginError: '',
      redirectUser: false
    }
    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onFocus = this.onFocus.bind(this)
  }

  /**
   * @description - handles the onchange event
   * @param  {object} event the event for the content field
   * @return {void}
   */
  onChange(event) {
    const name = event.target.name,
          value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  /**
   * @description - handles the onFocus event
   * @param  {object} event the event for the content field
   * @return {void} no return or void
   */
  onFocus(event) {
    const name = event.target.name;
    switch (name) {
      case 'username':
        this.setState({ loginError: '' })
        break;
      case 'password':
        this.setState({ loginError: '' })
    }
  }

  /**
   * @description - handles the login form
   * @param  {object} event the event for the content field
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.actions.loginAction(this.state)
      .then((data) => {
        if(data === true) {
        toastr.options = {
          "debug": false,
          "timeOut": "2000",
          "showEasing": "swing",
          "hideEasing": "linear",
          "showMethod": "fadeIn",
          "hideMethod": "fadeOut"
        };
        toastr.success('You have successfully signed in');
        setTimeout(() => {
          this.setState({ redirectUser:true });
         }, 3000)
      } else {
          this.setState({
            loginError: data
          })
        }
      })
  }

  /**
   * @description - get the background image on this component
   * @return {void} no return or void
   */
  componentDidMount() {
    document.body.style.backgroundImage = "url(/images/designed.png)"
    document.body.className = "body-component-b"
  }

  /**
   * @description - remove the background when out of this component
   * @return {void} no return or void
   */
  componentWillUnmount() {
    document.body.style.backgroundImage = "url('')"
  }

  /**
   * @description render - renders the class component
   * @return {object} returns an object
   */
  render() {
    return (
      this.state.redirectUser 
      ?
        <Redirect to='user/recipe'/>
      :
      <div>
        <div 
          className="header-login">
          <h4> Login</h4>
        </div>
        <form 
          onSubmit={this.handleSubmit} 
          className="form">
          <div 
            style={{color: 'red', textAlign: 'center', marginBottom: '12px'}}>
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
              id="validationServer01" 
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
 * mapDispatchToProps - maps dispatch to props value
 * @param  {Function} dispatch dispatchs function
 * @return {Object} returns an Object
 */
function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({
      loginAction
    }, dispatch)
  }
}

export default connect(null,  mapDispatchToProps)(Login);
