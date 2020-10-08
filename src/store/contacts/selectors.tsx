import StateInterface from './stateInterface';

interface StateObj {
  contacts: StateInterface;
}

export const getContacts = (state: StateObj) => state.contacts.list;
export const getIsLoadingContacts = (state: StateObj) => state.contacts.loading;
export const getErrorContacts = (state: StateObj) => state.contacts.error;
