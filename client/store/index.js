import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

/**
 * store - contains all the reducers
 *
 * @param  {object} initialState the initial state
 *
 * @return {Object} returns an Object
 */
export default function store(initialState = {}) {
  return createStore(
    reducers,
    initialState,
    compose(applyMiddleware(thunk), window.devToolsExtension && process.env.NODE_ENV === 'development ? window.devToolsExtension() : f => f),
  );
}
