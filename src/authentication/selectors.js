export const getToken = state => state.auth.token;
export const getStatus = state => state.auth.login;
export const getUserName = state => state.auth.user.username;
export const getUserEmail = state => state.auth.user.email;

export const getUserDetails = state => ({
  name: getUserName(state),
  email: getUserEmail(state),
});

export const getUserImage = state => state.auth.user.image;
