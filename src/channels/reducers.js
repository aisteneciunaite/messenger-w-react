import * as types from './types';

const DEFAULT_STATE = {
  openChannel: {
    id: null,
    name: null,
    users: [],
  },
  toolsOpen: false,
  loading: false,
  error: null,
  list: [],
};

function reducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case types.CHANNELS_REQ:
      return { ...state, loading: true };
    case types.CHANNELS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        list: action.payload,
      };
    case types.CHANNELS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case types.NEW_CHANNEL_SUCCESS:
      return {
        ...state,
        list: [action.payload, ...state.list],
      };

    case types.OPEN_CHANNEL:
      return {
        ...state,
        openChannel: {
          ...state.openChannel,
          id: action.channelId,
          name: action.channelName,
        },
      };

    case types.CHANNEL_USERS_REQ: {
      return state;
    }
    case types.CHANNEL_USERS_SUCCESS: {
      return { ...state, openChannel: { ...state.openChannel, users: action.payload.users } };
    }
    case types.CHANNEL_USERS_FAILURE: {
      return state;
    }

    case types.RENAME_CHANNEL_REQ:
      return state;
    case types.RENAME_CHANNEL_SUCCESS:
      return {
        ...state,
        list: state.list.map(item =>
          item._id === action.payload._id ? { ...item, name: action.payload.name } : item
        ),
      };
    case types.RENAME_CHANNEL_FAILURE:
      return state;

    case types.LEAVE_CHANNEL_REQ:
      return state;
    case types.LEAVE_CHANNEL_SUCCESS:
      return {
        ...state,
        openChannel: {
          ...DEFAULT_STATE.openChannel,
        },
        list: state.list.filter(channel => channel._id !== action.payload._id),
      };
    case types.LEAVE_CHANNEL_FAILURE:
      return state;

    case types.ADD_TO_CHANNEL_REQ:
      return state;
    case types.ADD_TO_CHANNEL_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        openChannel: { ...state.openChannel, users: [...state.openChannel.users, action.payload] },
      };
    case types.ADD_TO_CHANNEL_FAILURE:
      return state;

    case types.CHANNEL_TOOLS_OPEN:
      return { ...state, toolsOpen: true };
    case types.CHANNEL_TOOLS_CLOSE:
      return { ...state, toolsOpen: false };

    case types.CHANNEL_TOOLS_TOGGLE:
      return { ...state, toolsOpen: !state.toolsOpen };
    default:
      return state;
  }
}
export default reducer;
