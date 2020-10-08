import stateInterface from './stateInterface';

interface stateObj {
  auth: stateInterface;
}

export const getToken = (state: stateObj) => state.auth.token;
export const getStatus = (state: stateObj) => state.auth.login;
export const getUserName = (state: stateObj) => state.auth.user.username;
export const getUserEmail = (state: stateObj) => state.auth.user.email;

export const getUserDetails = (state: stateObj) => ({
  name: getUserName(state),
  email: getUserEmail(state),
});

export const getUserImage = (state: stateObj) => state.auth.user.image;

export const getRegisterError = (state: stateObj) => state.auth.register.error;

export const getLoginError = (state: stateObj) => state.auth.login.error;
