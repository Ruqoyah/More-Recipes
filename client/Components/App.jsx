import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Router, Route, Switch } from 'react-router-dom';
import Homepage from '../Components/Pages/Homepage';
import Signup from '../Components/Pages/Signup';
import Login from '../Components/Pages/Login';
import PageNotFound from '../Components/PageNotFound/PageNotFound';
import User from '../Components/Pages/User';


export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/login' component={Login} />
          <Route path='/user' component={User} />
          <Route path='*'component={PageNotFound} />
        </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
