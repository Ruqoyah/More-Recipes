import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom'


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
            <Link to="/recipe" className="btn btn-outline-success btn-lg btn-block">Login</Link>
        </div>
        <div className="join">
            <Link to="/signup">New to More Recipes? Join Free!</Link>
        </div>
    </form>

      </div>);
  }
}


