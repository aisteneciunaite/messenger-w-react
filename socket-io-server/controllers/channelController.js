const ChannelModel = require('../models/channelModel');
const UserModel = require('../models/userModel');

getAllChannels = async (req, res) => {
  ChannelModel.find((err, channels) => {
    if (err) return res.status(400).json(err);
    res.json(channels);
  });
};

create = async (req, res) => {
  let data = req.body;
  let user = req.user;

  let channel = new ChannelModel({
    name: data.channelName,
    isDM: data.isDM,
  });
  try {
    channel.users.push(user.id);
    let createdChannel = await channel.save();
    user.channels.push(createdChannel._id);
    await user.save();
    // console.log(createdChannel);
    res.json(createdChannel);
  } catch (error) {
    res.status(400).json(error);
  }
};

update = async (req, res) => {
  let channelId = req.params.channelId;
  let data = req.body;
  console.log(data);
  try {
    let updatedChannel = await ChannelModel.findByIdAndUpdate(channelId, { name: data.name });
    // if (!channel) throw 'channel not found';
    // channel.name = data.newName;
    // let updatedChannel = await channel.save();
    res.json(updatedChannel);
  } catch (error) {
    res.status(400).json(error);
  }
};

del = async (req, res) => {
  let channelId = req.params.channelId;
  let user = req.user;
  try {
    let deleted = await ChannelModel.findByIdAndRemove(channelId);
    if (!deleted) throw 'channel not found';
    // pull channel references from user model
    await user.updateOne({
      $pull: {
        channels: channelId,
      },
    });
    res.json(deleted);
  } catch (error) {
    res.status(400).json(error);
  }
};

addPerson = async (req, res) => {
  let channelId = req.params.channelId;
  let userId = req.params.userId;
  try {
    let channel = await ChannelModel.findById(channelId);
    if (!channel) throw 'channel not found';
    //check if user already exists in channel
    let exists = channel.users.map(obj => obj._id).includes(userId);
    if (exists) throw 'user already in channel';
    channel.users.push(userId);
    console.log(channelId);

    await UserModel.findByIdAndUpdate(userId, { $push: { channels: channelId } });
    let updatedChannel = await channel.save();
    res.json(updatedChannel);
  } catch (error) {
    res.status(400).json(error);
  }
};

removePerson = async (req, res) => {
  let channelId = req.params.channelId;
  let userId = req.params.userId;
  try {
    let channel = await ChannelModel.findById(channelId);
    if (!channel) throw 'channel not found';
    //check if user exists in channel
    let exists = channel.users.map(obj => obj._id).includes(userId);
    if (!exists) throw 'not found in channel';
    await channel.updateOne({
      $pull: {
        users: userId,
      },
    });
    await UserModel.findByIdAndUpdate(userId, {
      $pull: {
        channels: channelId,
      },
    });
    res.json('User removed from channel');
  } catch (error) {
    res.status(400).json(error);
  }
};

leaveChannel = async (req, res) => {
  let channelId = req.params.channelId;
  let user = req.user;
  try {
    let channel = await ChannelModel.findById(channelId);
    if (!channel) throw 'channel not found';
    // check if user exists in channel
    let exists = channel.users.map(obj => obj._id).includes(user._id);
    if (!exists) throw 'not found in channel';
    await channel.updateOne({
      $pull: {
        users: user._id,
      },
    });
    await user.updateOne({
      $pull: {
        channels: channelId,
      },
    });
    res.json('User removed from channel');
  } catch (error) {
    res.status(400).json(error);
  }
};

getChannelUsers = async (req, res) => {
  let channelId = req.params.channelId;
  try {
    let channel = await ChannelModel.findById(channelId).populate('users');
    if (!channel) throw 'channel not found';
    res.json(channel);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  create,
  update,
  del,
  addPerson,
  removePerson,
  getAllChannels,
  getChannelUsers,
  leaveChannel,
  // getChannelMessages,
};
