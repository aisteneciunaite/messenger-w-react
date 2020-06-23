import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import auth from '../../../authentication';

function PrivateRoute(props) {
  const authenticated = useSelector(state => !!auth.selectors.getToken(state));
  return authenticated ? <Route {...props} /> : <Redirect to="/login" />;
}

export default PrivateRoute;
