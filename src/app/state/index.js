import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import middleware from './middleware';
import auth from '../../authentication';

const composeEnhancers = composeWithDevTools({
  trace: true,
  traceLimit: 25,
});

const allMiddleware =
  process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION__
    ? composeEnhancers(applyMiddleware(...middleware))
    : applyMiddleware(...middleware);

const store = createStore(combineReducers({ auth: auth.authReducer }), allMiddleware);

export default store;
