import socketIOClient from 'socket.io-client';

import messages from '../../../messages';
// const store = useStore();
export const socket = socketIOClient('http://localhost:4000');
// socket.on('new message', data => {
//   //   console.log(store);
//   console.log(data);
// });

const socketMiddleware = ({ dispatch }) => next => action => {
  if (action.type === messages.types.SEND_SUCESS) {
    console.log(action.payload);
    socket.emit('new message', action.payload);
  }
  if (action.type === messages.types.ENTER_CHANNEL) {
    socket.emit('join channel', action.channelId);
  }

  return next(action);
};

export default socketMiddleware;
