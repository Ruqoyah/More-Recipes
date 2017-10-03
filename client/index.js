import React from 'react';
import jwt from 'jsonwebtoken';
import { render } from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import configureStore from '../client/store/index';
import { SET_CURRENT_USER } from '../client/actions/types';
import { setAuthorizationToken } from '../client/helper/index';
import './public/styles/style.scss';

const store = configureStore();

if (localStorage.token) {
  setAuthorizationToken(localStorage.token);
  store.dispatch({
    type: SET_CURRENT_USER,
    user: jwt.decode(localStorage.token)
  });
}

render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('app'));
