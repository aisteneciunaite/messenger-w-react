import * as types from './types';
const SERVER_URL = 'http://localhost:4000';
const LOGIN_ENDPOINT = '/user/login';
const LOGOUT_ENDPOINT = '/user/logout';
const REGISTER_ENDPOINT = '/user/register';

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
    const payload = await response.json();
    const userData = { email: payload.email, username: payload.username, image: payload.avatarUrl };

    dispatch({
      type: types.LOGIN_SUCESS,
      token: response.headers.get('x-auth-node'),
      payload: userData,
    });
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

export const register = ({ username, email, password }) => async dispatch => {
  const response = await fetch(SERVER_URL + REGISTER_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({ username, email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    dispatch({ type: types.REGISTER_FAILURE, payload: await response.json() });
  } else {
    dispatch(login({ email, password }));
  }
};
