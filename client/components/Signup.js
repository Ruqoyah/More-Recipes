import React, { Component } from 'react';
import { render } from 'react-dom'

import signUpAction from '../actions/auth_actions';

export default class App extends Component {
  render() {
    return (
      <div>
        <form name="register">
          <input type="text" name="username" />
          <input type="text" name="fullName" />
          <input type="email" name="email" />
          <input type="password" name="password" />
          <input type="password" name="cpassword" />
        </form>
      </div>);
  }
}


