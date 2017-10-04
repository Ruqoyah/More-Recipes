import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import  { signUpAction }  from '../../actions/auth_actions';
import { emailExist } from '../../helper/index';
import { userExist } from '../../helper/index';

class Signup extends Component {
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
      isLoading: ''
    }
    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  onChange(event) {
    const name = event.target.name,
      value = event.target.value;
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ isLoading: true })
    this.props.actions.signUpAction(this.state)
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
            window.location.href = '/recipe'
         }
        toastr.success('You have successfully signed up');
      })
      .catch((error) => console.log('Hello error'))
  }
 
  onFocus(e) {
    const name = e.target.name;
    switch (name) {
      case 'username':
        this.setState({ usernameError: '', userExist: '' })
        break;
      case 'password':
        this.setState({ passwordError: '' })
        break;
      case 'cpassword':
        this.setState({ passwordConfirmError: '' })
        break;
      case 'email':
        this.setState({ emailError: '', emailExist: '' })
    }
  }

  onBlur(e) {
    const name = e.target.name,
      value = e.target.value;
    const pass = document.getElementById('validationServer04').value
    switch (name) {
      case 'username':
      userExist({username: value})
      .then((res) => {
        if (res) {
          this.setState({ userExist: 'Username already exist' })
        }
      })
        if (value.length < 5 || !value) {
          this.setState({ usernameError: 'Please provide a username with atleast 5 characters' });
          return false;
        } else {
          this.setState({ usernameError: '' });
          return true;
        }
      case 'email':
      emailExist({email: value})
      .then((res) => {
        if (res) {
          this.setState({ emailExist: 'Email already exist' })
        }
      })
      case 'password':
        if (value.length < 8 || !value) {
          this.setState({ passwordError: 'Provide a valid password with minimum of 8 characters' });
          return false;
        } else {
          this.setState({ passwordError: '' });
          return true;
        }
      case 'cpassword':
        if (value != pass) {
          this.setState({ passwordConfirmError: 'Password does not match' });
          return false;
        } else {
          this.setState({ passwordConfirmError: '' });
          return true;
        }
    }
  }

  componentDidMount() {
    document.body.style.backgroundImage = "url(/images/designed.png)"
    document.body.className = "body-component-a"
  }

  render() {
    return (
      <div>
        <div className="header-signup">
          <h4>Signup</h4>
        </div>
        <form onSubmit={this.handleSubmit} className="form">
          <div className="form-group">
            <input name="username" type="text" onBlur={this.onBlur} onChange={this.onChange}
              onFocus={this.onFocus} className="form-control is-valid"
              id="validationServer01" placeholder="Username" required />
            <div className="invalid-feedback">{this.state.usernameError}</div>
            <div className="invalid-feedback">{this.state.userExist}</div>
          </div>
          <div className="form-group">
            <input name="fullName" type="text" onChange={this.onChange} className="form-control is-valid"
              id="validationServer02" placeholder="Full Name" required />
            <div className="invalid-feedback">{this.state.fullNameError}</div>
          </div>
          <div className="form-group">
            <input name="email" type="email" onBlur={this.onBlur} onChange={this.onChange}
              onFocus={this.onFocus} className="form-control is-valid"
              id="validationServer03" placeholder="Email" required />
            <div className="invalid-feedback">{this.state.emailError}</div>
            <div className="invalid-feedback">{this.state.emailExist}</div>
          </div>
          <div className="form-group">
            <input name="password" type="password" onBlur={this.onBlur} onChange={this.onChange}
              onFocus={this.onFocus} className="form-control is-valid"
              id="validationServer04" placeholder="Password" required />
            <div className="invalid-feedback">{this.state.passwordError}</div>
          </div>
          <div className="form-group">
            <input name="cpassword" type="password" onBlur={this.onBlur} onChange={this.onChange}
              onFocus={this.onFocus} className="form-control is-valid"
              id="validationServer05" placeholder="Confirm Password" required />
            <div className="invalid-feedback">{this.state.passwordConfirmError}</div>
          </div>
          <select className="custom-select d-block my-3" required>
            <option value="">Gender</option>
            <option value="1">Male</option>
            <option value="2">Female</option>
          </select>
          <div className="input-group">
            <button className="btn btn-outline-danger btn-lg btn-block" type="submit" name="submit"
              disabled={this.state.isLoading}>Finish</button>
          </div>
        </form>
      </div>);
  }
}
// function mapStateToProps(state){
//   console.log(state)
//   return {
//     auth: state.auth
//   }
// }
function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({
      signUpAction
    }, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Signup);