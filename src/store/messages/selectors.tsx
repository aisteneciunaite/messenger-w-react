import StateInterface from './stateInterface';

interface StateObj {
  messages: StateInterface;
}

export const getMessages = (state: StateObj) => state.messages.messages;

export const getIsLoadingMessages = (state: StateObj) => state.messages.isLoading;
