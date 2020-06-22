const mongoose = require('mongoose');

const ChannelSchema = new mongoose.Schema({
  name: String,
  isDM: {
    type: Boolean,
    default: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
});

const ChannelModel = mongoose.model('Channel', ChannelSchema);

module.exports = ChannelModel;
