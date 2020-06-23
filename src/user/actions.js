import * as types from './types';
const SERVER_URL = 'http://localhost:4000';

export const login = ({ email, password }) => async dispatch => {
  dispatch({ type: types.LOGIN_REQ });

  const response = await fetch(SERVER_URL + LOGIN_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    dispatch({ type: types.LOGIN_SUCESS, payload: response.headers.get('x-auth-node') });
  } else {
    dispatch({ type: types.LOGIN_FAILURE, payload: await response.json() });
  }
};

export const logout = token => async dispatch => {
  dispatch({ type: types.LOGOUT_REQ });

  const response = await fetch(SERVER_URL + LOGOUT_ENDPOINT, {
    method: 'GET',
    headers: {
      'x-auth-node': token,
    },
  });
  if (response.ok) {
    dispatch({ type: types.LOGOUT_SUCESS });
  } else {
    dispatch({ type: types.LOGOUT_FAILURE, payload: await response.json() });
  }
};
