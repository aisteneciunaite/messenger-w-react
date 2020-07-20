import * as types from './types';
const SERVER_URL = 'http://localhost:4000';
const GET_CHANNELS = '/user/getChannels';
const CREATE_CHANNEL = '/channel/create';

export const fetchUserChannels = token => async dispatch => {
  dispatch({ type: types.CHANNELS_REQ });

  let response = await fetch(`${SERVER_URL + GET_CHANNELS}`, {
    method: 'GET',
    headers: {
      'x-auth-node': token,
    },
  });
  if (response.ok) dispatch({ type: types.CHANNELS_SUCCESS, payload: await response.json() });
  else dispatch({ type: types.CHANNELS_FAILURE, error: await response.json() });
};

export const newChannel = ({ name, token }) => async dispatch => {
  dispatch({ type: types.NEW_CHANNEL_REQ });

  let response = await fetch(`${SERVER_URL + CREATE_CHANNEL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-node': token,
    },
    body: JSON.stringify({ channelName: name }),
  });

  if (response.ok) dispatch({ type: types.NEW_CHANNEL_SUCCESS, payload: await response.json() });
  else dispatch({ type: types.NEW_CHANNEL_FAILURE, error: await response.json() });
};
