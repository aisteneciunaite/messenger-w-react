import * as types from './types';
import stateInterface from './stateInterface';

const TOKEN_KEY = 'x-auth-node';
const localUser = localStorage.getItem('app-user');
const DEFAULT_AUTH_STATE: stateInterface = {
  user: (localUser && JSON.parse(localUser)) || {},
  token: localStorage.getItem(TOKEN_KEY),
  login: {
    loading: false,
    error: null,
  },
  register: {
    loading: false,
    error: null,
  },
};

function authReducer(state = DEFAULT_AUTH_STATE, action: { type: any; payload: any; token: any }) {
  switch (action.type) {
    case types.LOGIN_REQ:
      return { ...state, login: { ...state.login, loading: true } };
    case types.LOGIN_FAILURE:
      return { ...state, login: { ...state.login, loading: false, error: action.payload } };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        user: action.payload,
        login: { ...state.login, loading: false, error: null },
      };
    case types.LOGOUT_REQ:
      return { ...state, login: { ...state.login, loading: true } };
    case types.LOGOUT_SUCCESS:
      return { ...state, token: null, login: { ...state.login, loading: false, error: null } };
    case types.LOGOUT_FAILURE:
      return { ...state, login: { ...state.login, error: action.payload } };
    case types.REGISTER_FAILURE:
      return { ...state, register: { ...state.register, error: action.payload } };
    default:
      return state;
  }
}
export default authReducer;
