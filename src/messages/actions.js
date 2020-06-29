import * as types from './types';
const SERVER_URL = 'http://localhost:4000';

export const fetchMessages = ({ token, channelId, skip, limit = 10 }) => async dispatch => {
  dispatch({ type: types.MESSAGES_REQ });

  let response = await fetch(`${SERVER_URL}/getMessages/${channelId}/${skip}/${limit}`, {
    method: 'GET',
    headers: {
      'x-auth-node': token,
    },
  });
  if (response.ok) dispatch({ type: types.MESSAGES_SUCESS, payload: await response.json() });
  else dispatch({ type: types.MESSAGES_FAILURE, error: await response.json() });
};

export const enterChannel = channelId => {
  localStorage.setItem('app-channel', channelId);
  return { type: types.ENTER_CHANNEL, channelId };
};
