import * as types from './types';
const SERVER_URL = 'http://localhost:4000';
const GET_CHANNELS = '/user/getChannels';
const CREATE_CHANNEL = '/channel/create';

interface ChannelObj {
  name?: string;
  channelName?: string;
  channelId?: number;
}

interface TokenObj {
  token: string;
}

type ChannelAndToken = ChannelObj & TokenObj;

export const fetchUserChannels = (token: string) => async (dispatch: any) => {
  if (!token) return;
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

export const newChannel = ({ name, token }: ChannelAndToken) => async (dispatch: any) => {
  if (!name || !token) return;
  dispatch({ type: types.NEW_CHANNEL_REQ });

  let response = await fetch(`${SERVER_URL + CREATE_CHANNEL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-node': token,
    },
    body: JSON.stringify({ channelName: name }),
  });

  if (response.ok) {
    const newChannel = await response.json();
    dispatch({ type: types.NEW_CHANNEL_SUCCESS, payload: newChannel });
    dispatch(openChannel({ channelId: newChannel._id, channelName: newChannel.name, token }));
  } else dispatch({ type: types.NEW_CHANNEL_FAILURE, error: await response.json() });
};

export const openChannel = ({ channelId, channelName, token }: ChannelAndToken) => async (
  dispatch: any
) => {
  if (!channelName || !channelId || !token) return;
  dispatch(fetchChannelUsers({ channelId, token }));
  dispatch({ type: types.OPEN_CHANNEL, channelId, channelName });
  localStorage.setItem('app-channel', JSON.stringify({ channelId, channelName }));
};

export const fetchChannelUsers = ({ channelId, token }: ChannelAndToken) => async (
  dispatch: any
) => {
  dispatch({ type: types.CHANNEL_USERS_REQ });

  let response = await fetch(`${SERVER_URL}/channel/getUsers/${channelId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-node': token,
    },
  });
  if (response.ok) {
    dispatch({ type: types.CHANNEL_USERS_SUCCESS, payload: await response.json() });
  } else dispatch({ type: types.CHANNEL_USERS_FAILURE, error: await response.json() });
};

export const renameChannel = ({ name, token, channelId }: ChannelAndToken) => async (
  dispatch: any
) => {
  if (!name || !channelId || !token) return;
  dispatch({ type: types.RENAME_CHANNEL_REQ });

  let response = await fetch(`${SERVER_URL}/channel/update/${channelId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-node': token,
    },
    body: JSON.stringify({ name }),
  });

  if (response.ok) dispatch({ type: types.RENAME_CHANNEL_SUCCESS, payload: await response.json() });
  else dispatch({ type: types.RENAME_CHANNEL_FAILURE, error: await response.json() });
};

export const leaveChannel = ({ channelId, token }: ChannelAndToken) => async (dispatch: any) => {
  if (!channelId || !token) return;
  dispatch({ type: types.LEAVE_CHANNEL_REQ });

  let response = await fetch(`${SERVER_URL}/channel/leave/${channelId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-node': token,
    },
  });
  if (response.ok) {
    dispatch({ type: types.LEAVE_CHANNEL_SUCCESS, payload: await response.json() });
    localStorage.removeItem('app-channel');
  } else dispatch({ type: types.LEAVE_CHANNEL_FAILURE, error: await response.json() });
};

export const deleteChannel = ({ channelId, token }: ChannelAndToken) => async (dispatch: any) => {
  if (!channelId || !token) return;
  dispatch({ type: types.LEAVE_CHANNEL_REQ });

  let response = await fetch(`${SERVER_URL}/channel/delete/${channelId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-node': token,
    },
  });
  if (response.ok) {
    dispatch({ type: types.LEAVE_CHANNEL_SUCCESS, payload: await response.json() });
    localStorage.removeItem('app-channel');
  } else dispatch({ type: types.LEAVE_CHANNEL_FAILURE, error: await response.json() });
};

export const addToChannel = ({ channelId, token, user }: ChannelAndToken & { user: any }) => async (
  dispatch: any
) => {
  if (!channelId || !token || !user) return;
  dispatch({ type: types.ADD_TO_CHANNEL_REQ });

  let response = await fetch(`${SERVER_URL}/channel/addPerson/${channelId}/${user._id}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-node': token,
    },
  });
  if (response.ok) {
    dispatch({ type: types.ADD_TO_CHANNEL_SUCCESS, payload: user });
  } else dispatch({ type: types.ADD_TO_CHANNEL_FAILURE, error: await response.json() });
};

export const toggleChannelTools = (isOpen: boolean) => {
  if (typeof isOpen === 'boolean') {
    return { type: isOpen ? types.CHANNEL_TOOLS_CLOSE : types.CHANNEL_TOOLS_OPEN };
  }
};
