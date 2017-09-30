import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import configureStore from '../client/store/index'
import './public/styles/style.scss';

const store = configureStore();

render(<Provider store={store}>
    <App />
  </Provider>, document.getElementById('app'));
