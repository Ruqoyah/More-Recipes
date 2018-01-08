import React from 'react';
import jwt from 'jsonwebtoken';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import store from '../client/store';
import { SET_CURRENT_USER } from '../client/actions/types';
import { setAuthorizationToken } from '../client/helper';
import './public/styles/style.scss';

const configureStore = store();

if (localStorage.token) {
  setAuthorizationToken(localStorage.token);
  configureStore.dispatch({
    type: SET_CURRENT_USER,
    user: jwt.decode(localStorage.token)
  });
}

render(<Provider store={configureStore}>
  <App />
</Provider>, document.getElementById('app'));

