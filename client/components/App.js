import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from '../components/Homepage/Homepage';
import Signup from '../components/Signup/Signup';
import Login from '../components/Login/Login';
import RecipePage from '../components/RecipePage/RecipePage';
import Footer from '../components/Common/Footer';
import PageNotFound from '../components/PageNotFound/PageNotFound';
import AddRecipe from '../components/AddRecipe/AddRecipe'

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/login' component={Login} />
          <Route path='/recipe' component={RecipePage} />
          <Route path='/addrecipe' component={AddRecipe} />
          <Route path='*'component={PageNotFound} />
        </Switch>
        <Footer />
        </div>
      </Router>
    );
  }
}
