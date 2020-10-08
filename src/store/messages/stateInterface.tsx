export default interface StateInterface {
  isLoading: boolean;
  details: object;
  messages: MessageObj[];
}

interface MessageObj {
  user: { username: any; avatarUrl: any };
  createdAt: any;
  text: any;
  _id: string | number | null | undefined;
}
