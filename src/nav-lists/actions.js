import * as types from './types';
const SERVER_URL = 'http://localhost:4000';
const GET_CHANNELS = '/user/getChannels';
const GET_CONTACTS = '/user/getContacts';
const CREATE_CHANNEL = '/channel/create';
const ADD_CONTACT = '/user/addContact';

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

export const fetchUserContacts = token => async dispatch => {
  dispatch({ type: types.CONTACTS_REQ });

  let response = await fetch(`${SERVER_URL + GET_CONTACTS}`, {
    method: 'GET',
    headers: {
      'x-auth-node': token,
    },
  });

  if (response.ok) dispatch({ type: types.CONTACTS_SUCCESS, payload: await response.json() });
  else dispatch({ type: types.CONTACTS_FAILURE, error: await response.json() });
};

export const fethChannelsAndContacts = token => dispatch => {
  dispatch(fetchUserChannels(token));
  dispatch(fetchUserContacts(token));
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

export const newContact = ({ email, token }) => async dispatch => {
  dispatch({ type: types.NEW_CONTACT_REQ });

  let response = await fetch(`${SERVER_URL + ADD_CONTACT}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-node': token,
    },
    body: JSON.stringify({ email }),
  });

  if (response.ok) dispatch({ type: types.NEW_CONTACT_SUCCESS, payload: await response.json() });
  else dispatch({ type: types.NEW_CONTACT_FAILURE, error: await response.json() });
};
