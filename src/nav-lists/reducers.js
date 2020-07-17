import * as types from './types';

const DEFAULT_STATE = {
  channels: {
    loading: false,
    error: null,
    list: [],
  },
  contacts: {
    loading: false,
    error: null,
    list: [],
  },
};

function reducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case types.CHANNELS_REQ:
      return { ...state, channels: { ...state.channels, loading: true } };
    case types.CHANNELS_SUCCESS:
      return {
        ...state,
        channels: { ...state.channels, loading: false, error: null, list: action.payload },
      };
    case types.CHANNELS_FAILURE:
      return { ...state, channels: { ...state.channels, loading: false, error: action.payload } };

    case types.CONTACTS_REQ:
      return { ...state, contacts: { ...state.contacts, loading: true } };
    case types.CONTACTS_SUCCESS:
      return {
        ...state,
        contacts: { ...state.contacts, loading: false, error: null, list: action.payload },
      };
    case types.CONTACTS_FAILURE:
      return { ...state, contacts: { ...state.contacts, loading: false, error: action.payload } };

    case types.NEW_CHANNEL_SUCCESS:
      return {
        ...state,
        channels: { ...state.channels, list: [action.payload, ...state.channels.list] },
      };

    case types.NEW_CONTACT_SUCCESS:
      return {
        ...state,
        contacts: { ...state.contacts, list: [action.payload, ...state.contacts.list] },
      };

    default:
      return state;
  }
}
export default reducer;
