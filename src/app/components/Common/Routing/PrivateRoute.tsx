import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';

import auth from '../../../../store/authentication';

function PrivateRoute(
  props: JSX.IntrinsicAttributes &
    JSX.IntrinsicClassAttributes<Route<RouteProps>> &
    Readonly<RouteProps> &
    Readonly<any>
) {
  const authenticated = !!useSelector(auth.selectors.getToken);
  return authenticated ? <Route {...props} /> : <Redirect to="/login" />;
}

export default PrivateRoute;
