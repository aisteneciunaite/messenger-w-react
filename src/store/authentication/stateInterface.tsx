export default interface StateInterface {
  user: {
    username: string;
    email: string;
    image: string;
  };
  token: string | null;
  login: {
    loading: boolean;
    error: any;
  };
  register: {
    loading: boolean;
    error: any;
  };
}
