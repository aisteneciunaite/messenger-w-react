const MessageModel = require('../models/messageModel');

getAllMessages = async (req, res) => {
  MessageModel.find((err, messages) => {
    if (err) return res.status(400).json(err);
    res.json(messages);
  });
};

send = async (req, res) => {
  let data = req.body;
  let user = req.user;
  let channelId = req.params.channelId;

  //make sure user exists in channel

  let message = new MessageModel({
    text: data.text,
    user: user._id,
    channel: channelId,
  });
  try {
    let createdMessage = await message.save();
    await createdMessage.populate('user').execPopulate();
    console.log(createdMessage);
    res.json(createdMessage);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

getChannelMessages = async (req, res) => {
  let channelId = req.params.channelId;
  let skip = Number(req.params.skip);
  let limit = Number(req.params.limit);
  try {
    let messages = await MessageModel.find({ channel: channelId })
      .sort({ createdAt: 'desc' })
      .skip(skip)
      .limit(limit)
      .populate('user');
    res.json(messages);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

getChannelMsgCount = async (req, res) => {
  let channelId = req.params.channelId;
  try {
    let count = await MessageModel.countDocuments({ channel: channelId });
    res.json(count);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

edit = async (req, res) => { };
del = async (req, res) => { };

module.exports = {
  send,
  edit,
  del,
  getAllMessages,
  getChannelMessages,
  getChannelMsgCount,
};
