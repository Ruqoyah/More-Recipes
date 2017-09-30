import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router-dom';
import  { loginAction }  from '../../actions/auth_actions';


export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loginError: '',
      isLoading: false
    }
    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(event) {
    const name = event.target.name;
    value = event.target.value;
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ isLoading: true })
    this.props.actions.loginAction(this.state)
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
        toastr.success('You have successfully signed in',
          () => {
            this.setState({ isLoading: false })
            // window.location.href = '/recipe';
          });
      })
      .catch((error) => console.log('Hello login'))
  }

  componentDidMount() {
    document.body.style.backgroundImage = "url(/images/designed.png)"
    document.body.className = "body-component-b"
  }

  render() {
    return (
      <div>
        <div className="header-login">
          <h4> Login</h4>
        </div>
        <form onSubmit={this.handleSubmit} className="form">
          <div className="form-group">
            <input type="text" className="form-control is-valid"
              id="validationServer01" placeholder="Username" required />
            <div className="invalid-feedback">{this.state.usernameError}</div>
          </div>
          <div className="form-group">
            <input type="password" className="form-control is-valid"
              id="validationServer01" placeholder="Password" required />
            <div className="invalid-feedback"></div>
          </div>
          <div className="input-group">
            <button className="btn btn-outline-success btn-lg btn-block" disabled={this.state.isLoading}>Login</button>
          </div>
          <div className="join">
            <Link to="/signup">New to More Recipes? Join Free!</Link>
          </div>
        </form>
      </div>);
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({
      loginAction
    }, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Login);
