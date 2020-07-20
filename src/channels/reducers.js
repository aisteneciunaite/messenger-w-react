import * as types from './types';

const DEFAULT_STATE = {
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
        ...state, loading: false, error: null, list: action.payload,
      };
    case types.CHANNELS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case types.NEW_CHANNEL_SUCCESS:
      return {
        ...state,
        list: [action.payload, ...state.channels.list],
      };

    default:
      return state;
  }
}
export default reducer;
