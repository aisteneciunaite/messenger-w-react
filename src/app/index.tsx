import './index.scss';

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
// import socketIOClient from 'socket.io-client';
// const ENDPOINT = 'http://127.0.0.1:4000';

import store from './state';

//Components
import PrivateRoute from './components/Common/Routing/PrivateRoute';
import PublicRoute from './components/Common/Routing/PublicRoute';
import PageLayout from './components/Common/PageLayout';

const Chat = lazy(() => import('./pages/Chat'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <PageLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <PrivateRoute exact path="/">
                <Chat />
              </PrivateRoute>
              <PublicRoute path="/login">
                <Login />
              </PublicRoute>
              <PublicRoute path="/register">
                <Register />
              </PublicRoute>
            </Switch>
          </Suspense>
        </PageLayout>
      </Router>
    </Provider>
  );
}

export default App;
