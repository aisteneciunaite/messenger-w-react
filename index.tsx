//npm modules
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

//my modules
const router = require('./socket-io-server/routes');

const app = express();
const http = require('http').createServer(app);
const socketIo = require('socket.io')(http);
const corsOptions = {
  exposedHeaders: ['x-auth-node'],
};

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

mongoose.connection.once('open', function () {
  console.log('connected');
  // we're connected!
  app.use(cors(corsOptions)); // must be before all else app.use functions

  // app.use(express.static('public'));

  app.use('/uploads', express.static('uploads'));
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  app.use(bodyParser.json());

  app.use(router);

  http.listen(4000, () => {
    console.log('listening on *:4000');
  });
});

// let interval;

socketIo.on('connection', socket => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('new message', msg => {
    socket.to(msg.channel).emit('new message', msg);
    console.log('message emited to', msg.channel);
  });
  socketIo.on('join channel', channelId => {
    socket.join(channelId);
    console.log('user joined', channelId);
  });
  // if (interval) {
  //   clearInterval(interval);
  // }
  // interval = setInterval(() => getApiAndEmit(socket), 1000);
});

// const getApiAndEmit = socket => {
//   const response = new Date();
//   // Emitting a new message. Will be consumed by the client
//   socket.emit('FromAPI', response);
// };
