import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import middleware from './middleware';
import auth from 'authentication';
import channels from 'channels';
import contacts from 'contacts';
import messages from 'messages';

const composeEnhancers = composeWithDevTools({
  trace: true,
  traceLimit: 25,
});

const allMiddleware =
  process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION__
    ? composeEnhancers(applyMiddleware(...middleware))
    : applyMiddleware(...middleware);

const store = createStore(
  combineReducers({
    auth: auth.authReducer,
    channels: channels.userReducer,
    contacts: contacts.userReducer,
    messages: messages.msgReducer,
  }),
  allMiddleware
);

export default store;
