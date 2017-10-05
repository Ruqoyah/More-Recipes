import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducers from '../reducers/index';

/* eslint-disable no-underscore-dangle */
export default function configureStore(initialState = {}) {
  return createStore(
    rootReducers,
    initialState,
    compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}

/* eslint-enable */
