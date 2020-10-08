import * as types from './types';
const SERVER_URL = 'http://localhost:4000';

interface ChannelAndToken {
  channelId: number;
  token: string;
}

export const fetchMessages = ({
  token,
  channelId,
  skip,
  limit = 10,
}: ChannelAndToken & { skip: number; limit?: number }) => async (dispatch: any) => {
  if (!channelId || !token) return;
  dispatch({ type: types.MESSAGES_REQ });

  let response = await fetch(`${SERVER_URL}/getMessages/${channelId}/${skip}/${limit}`, {
    method: 'GET',
    headers: {
      'x-auth-node': token,
    },
  });
  if (response.ok) dispatch({ type: types.MESSAGES_SUCCESS, payload: await response.json() });
  else dispatch({ type: types.MESSAGES_FAILURE, error: await response.json() });
};

export const sendMessage = ({
  channelId,
  token,
  text,
}: ChannelAndToken & { text: string }) => async (dispatch: any) => {
  if (!channelId || !token || !text) return;

  dispatch({ type: types.SEND_REQ });

  let response = await fetch(`${SERVER_URL}/sendMessage/${channelId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-node': token,
    },
    body: JSON.stringify({ text }),
  });
  if (response.ok) {
    dispatch({ type: types.SEND_SUCCESS, payload: await response.json() });
  } else dispatch({ type: types.SEND_FAILURE, error: await response.json() });
};

export const recieveMessage = (message: object) => ({
  type: types.MESSAGE_RECEIVE,
  payload: message,
});
