const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { superSecretPassword } = require('../config/config');

getAllUsers = (req, res) => {
  UserModel.find((err, users) => {
    if (err) return res.status(400).json(err);
    res.json(users);
  }).populate('contacts');
};

register = async (req, res) => {
  let data = req.body;

  let user = new UserModel({
    email: data.email,
    password: data.password,
    username: data.username,
  });

  try {
    let createdUser = await user.save();
    res.json(createdUser);
  } catch (err) {
    res.status(400).json(err);
  }
};

login = async (req, res) => {
  let data = req.body;
  try {
    let user = await UserModel.findOne({ email: data.email });
    if (!user) throw 'no such user';
    const match = await bcrypt.compare(data.password, user.password);
    if (!match) throw 'wrong password';

    let role = 'userRole';
    let token = jwt.sign({ id: user._id }, superSecretPassword);
    console.log(token);
    user.tokens.push({ token: token, role: role });
    user.save();

    res.header('x-auth-node', token).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

logout = async (req, res) => {
  let user = req.user;
  let token = req.token;
  await user.update({
    $pull: {
      tokens: {
        token: token,
      },
    },
  });
  res.json('Succsessfully logged out');
};

addContact = async (req, res) => {
  let data = req.body;
  let user = req.user;
  try {
    let newContact = await UserModel.findOne({ email: data.email });
    if (!newContact) throw 'no such user';
    let exists = user.contacts.map(obj => obj._id).includes(newContact.id);
    if (exists) throw 'contact already exists';
    user.contacts.push(newContact.id);
    console.log(user._id);
    console.log(newContact._id);
    if (newContact.email !== user.email) {
      newContact.contacts.push(user._id);
      await newContact.save();
    }
    await user.save();
    res.json(newContact.email + 'contact added');
  } catch (error) {
    res.status(400).json(error);
  }
};

removeContact = async (req, res) => {
  let user = req.user;
  let contact = req.params.userId;
  try {
    //check if connection exists
    await user.update({
      $pull: { contacts: user._id },
    });
    await UserModel.findByIdAndUpdate(contact, {
      $pull: { contacts: user._id },
    });
    res.json('connection removed');
  } catch (error) {
    res.status(400).json(error);
  }
};

changePassword = async (req, res) => {
  let data = req.body;
  let user = req.user;
  try {
    //check password
    const match = await bcrypt.compare(data.oldPassword, user.password);
    if (!match) throw 'wrong password';
    //check if both new passwords are same
    // if(data.oldPassword === data.newPassword) throw 'new password can not be same as last password'
    if (data.newPassword === data.repeatNewPassword) {
      //overwrite old password with new one
      user.password = data.newPassword;
      await user.save();
      res.json('password changed');
    } else throw 'new passwords do not match';
  } catch (err) {
    res.status(400).json(err);
  }
};

changePicture = async (req, res) => {
  // console.log('file', req.file);
  let user = req.user;
  user.profilePicture = `http://localhost:4000/${req.file.path}`;
  let saveUser = await user.save();
  res.json(saveUser);
};

getUserChannels = async (req, res) => {
  let user = req.user;
  try {
    await user.populate('channels').execPopulate();
    res.json(user.channels);
  } catch (error) {
    res.status(400).json(error);
  }
};

getContacts = async (req, res) => {
  let user = req.user;
  try {
    await user.populate('contacts').execPopulate();
    res.json(user.contacts);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  register,
  login,
  changePassword,
  logout,
  changePicture,
  addContact,
  getAllUsers,
  getUserChannels,
  getContacts,
  removeContact,
};
