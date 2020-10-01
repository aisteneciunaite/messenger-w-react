import * as types from './types';

const DEFAULT_STATE = {
  loading: false,
  error: null,
  list: [],
};

function reducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case types.CONTACTS_REQ:
      return { ...state, loading: true };
    case types.CONTACTS_SUCCESS:
      return {
        ...state,
        loading: false, error: null, list: action.payload,
      };
    case types.CONTACTS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case types.NEW_CONTACT_SUCCESS:
      return {
        ...state,
        list: [action.payload, ...state.list],
      };

    default:
      return state;
  }
}
export default reducer;
