import auth from '../../../authentication';
const TOKEN_KEY = 'x-auth-node';

const test = ({ dispatch }) => next => action => {
  if (action.type === auth.types.LOGIN_SUCESS) {
    localStorage.setItem(TOKEN_KEY, action.token);
    localStorage.setItem('app-user', JSON.stringify(action.payload));
  }

  if (action.type === auth.types.LOGOUT_SUCESS) {
    localStorage.removeItem(TOKEN_KEY);
  }

  if (action.error === 401) {
    console.log('you dont belong here');
    return dispatch(auth.actions.logout(localStorage.getItem(TOKEN_KEY)));
  }

  return next(action);
};

export default test;
