export default interface StateInterface {
  openChannel: {
    id: number | null;
    name: string | null;
    users: object[];
  };
  toolsOpen: boolean;
  loading: boolean;
  error: any;
  list: { _id: number; name: string }[];
}
