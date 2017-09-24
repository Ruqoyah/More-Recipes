import React, { Component } from 'react';
import { render } from 'react-dom';


export default class Login extends Component {

componentDidMount(){
    document.body.style.backgroundImage = "url(/images/designed.png)"
    document.body.className="body-component-b"
}
  render() {
    return (
      <div>
        <div className="header-login">
        <h4> Login</h4>
    </div>
    <form className="form">
        <div className="form-group">
            <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
        </div>
        <div className="form-group">
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
        </div>
        <div className="input-group">
            <a href="#" className="btn btn-outline-success btn-lg btn-block">Login</a>
        </div>
        <div className="join">
            <a href="#">New to More Recipes? Join Free!</a>
        </div>
    </form>

      </div>);
  }
}


