import socketIOClient from 'socket.io-client';

import messages from '../../../messages';
export const socket = socketIOClient('http://localhost:4000');

const socketMiddleware = ({ dispatch }) => next => action => {
  if (action.type === messages.types.SEND_SUCCESS) {
    socket.emit('new message', action.payload);
  }
  if (action.type === messages.types.ENTER_CHANNEL) {
    socket.emit('join channel', action.channelId);
  }

  return next(action);
};

export default socketMiddleware;
