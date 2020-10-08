import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';

import auth from '../../../../store/authentication';

export function PublicRoute(
  props: JSX.IntrinsicAttributes &
    JSX.IntrinsicClassAttributes<Route<RouteProps>> &
    Readonly<RouteProps> &
    Readonly<any>
) {
  const authenticated = !!useSelector(auth.selectors.getToken);
  return authenticated ? <Redirect to="/" /> : <Route {...props} />;
}

export default PublicRoute;
