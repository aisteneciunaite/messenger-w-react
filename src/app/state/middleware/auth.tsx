import auth from '../../../store/authentication';
const TOKEN_KEY = 'x-auth-node';

interface ActionObj {
  type: string;
  token: string;
  payload: any;
  error: number;
}

const test = ({ dispatch }: any) => (next: any) => (action: ActionObj) => {
  if (action.type === auth.types.LOGIN_SUCCESS) {
    localStorage.setItem(TOKEN_KEY, action.token);
    localStorage.setItem('app-user', JSON.stringify(action.payload));
  }

  if (action.type === auth.types.LOGOUT_SUCCESS) {
    localStorage.removeItem(TOKEN_KEY);
  }

  if (action.error === 401) {
    console.log('you dont belong here');
    let token = localStorage.getItem(TOKEN_KEY);
    return token && dispatch(auth.actions.logout(token));
  }

  return next(action);
};

export default test;
