import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginAction } from '../../actions/auth_actions';


class Login extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loginError: '',
      isLoading: ''
    }
    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onFocus = this.onFocus.bind(this)
  }

  onChange(event) {
    const name = event.target.name,
          value = event.target.value;
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onFocus(e) {
    const name = e.target.name;
    switch (name) {
      case 'username':
        this.setState({ loginError: '' })
        break;
      case 'password':
        this.setState({ loginError: '' })
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.actions.loginAction(this.state)
      .then((data) => {
        if(data === true) {
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
          window.location.href = '/recipe';
         }
        toastr.success('You have successfully signed in');
      } else {
          this.setState({
            loginError: data
          })
        }
      })
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
          <div style={{color: 'red', textAlign: 'center', 
          marginBottom: '12px'}}>{this.state.loginError}</div>
          <div className="form-group">
            <input onFocus={this.onFocus} name="username" type="text" className="form-control is-valid"
               onChange={this.onChange} id="validationServer01" placeholder="Username" required/>
          </div>
          <div className="form-group">
            <input onFocus={this.onFocus} name="password" type="password" className="form-control is-valid"
               onChange={this.onChange} id="validationServer01" placeholder="Password" required/>
          </div>
          <div className="input-group">
            <button className="btn btn-outline-success btn-lg btn-block">Login</button>
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

export default connect(null,  mapDispatchToProps)(Login);
