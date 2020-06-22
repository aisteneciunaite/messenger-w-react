const mongoose = require('mongoose');
const ChannelModel = require('./channelModel');

const MessageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  channel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Channel',
    required: true,
  },
});

MessageSchema.pre('save', async function (next) {
  //save message reference in channel when sent
  let message = this;
  if (message.isNew) {
    let channel = await ChannelModel.findById(message.channel);
    await channel.messages.push(message._id);
    channel.save();
  }

  next();
});

const MessageModel = mongoose.model('Message', MessageSchema);

module.exports = MessageModel;
