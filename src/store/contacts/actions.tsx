import * as types from './types';
const SERVER_URL = 'http://localhost:4000';
const GET_CONTACTS = '/user/getContacts';
const ADD_CONTACT = '/user/addContact';

export const fetchUserContacts = (token: string) => async (dispatch: any) => {
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

export const newContact = ({ email, token }: { email: string; token: string }) => async (
  dispatch: any
) => {
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
