import * as types from './types';

const DEFAULT_STATE = {
  channelId: localStorage.getItem('app-channel') || null,
  isLoading: false,
  details: {},
  messages: [],
};

function msgReducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case types.MESSAGES_REQ:
      return { ...state, isLoading: true };
    case types.MESSAGES_SUCESS:
      console.log(action.payload);
      return { ...state, isLoading: false, messages: action.payload };
    case types.MESSAGES_FAILURE:
      return { ...state, isLoading: false };
    case types.ENTER_CHANNEL:
      return { ...state, channelId: action.channelId };

    default:
      return state;
  }
}
export default msgReducer;
