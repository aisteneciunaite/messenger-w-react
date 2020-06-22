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
const io = require('socket.io')(http);
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

  app.use(express.static('public'));

  app.use('/uploads', express.static('uploads'));
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  app.use(bodyParser.json());

  app.use('/v1', router);

  http.listen(4000, () => {
    console.log('listening on *:4000');
  });
});

io.on('connection', socket => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', msg => {
    io.to(msg.channel).emit('chat message', msg);
    console.log('message emited to', msg.channel);
    // io.emit('chat message', msg);
  });
  socket.on('join channel', channelId => {
    socket.join(channelId);
    console.log('user joined', channelId);
  });
});
