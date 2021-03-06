import * as types from './types';

import StateInterface from './stateInterface';

const DEFAULT_STATE: StateInterface = {
  isLoading: false,
  details: {},
  messages: [],
};

function msgReducer(state = DEFAULT_STATE, action: { type: string; payload: any[] }) {
  switch (action.type) {
    case types.MESSAGES_REQ:
      return { ...state, isLoading: true };
    case types.MESSAGES_SUCCESS:
      return { ...state, isLoading: false, messages: action.payload.reverse() };
    case types.MESSAGES_FAILURE:
      return { ...state, isLoading: false };
    case types.SEND_SUCCESS:
      return { ...state, isLoading: false };
    case types.MESSAGE_RECEIVE:
      return { ...state, messages: [...state.messages, action.payload] };
    default:
      return state;
  }
}
export default msgReducer;
