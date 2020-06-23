import './index.scss';

import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
// import socketIOClient from 'socket.io-client';
// const ENDPOINT = 'http://127.0.0.1:4000';

import store from './state';

//Components
import PrivateRoute from './components/Routing/PrivateRoute';
import PublicRoute from './components/Routing/PublicRoute';
import PageLayout from './components/PageLayout';

import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  // const [response, setResponse] = useState('');

  // useEffect(() => {
  //   const socket = socketIOClient(ENDPOINT);
  //   socket.on('FromAPI', data => {
  //     setResponse(data);
  //   });
  // CLEAN UP THE EFFECT
  // return () => socket.disconnect()
  // }, []);
  return (
    <Provider store={store}>
      <Router>
        <PageLayout>
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
        </PageLayout>
      </Router>
    </Provider>
  );
}

export default App;
