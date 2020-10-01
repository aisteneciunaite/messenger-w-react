import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import middleware from './middleware';
import auth from 'store/authentication';
import channels from 'store/channels';
import contacts from 'store/contacts';
import messages from 'store/messages';
import layout from './layout';

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
    channels: channels.channelsReducer,
    contacts: contacts.userReducer,
    messages: messages.msgReducer,
    layout: layout.layoutReducer,
  }),
  allMiddleware
);

export default store;
