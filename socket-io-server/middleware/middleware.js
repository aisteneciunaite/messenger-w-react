const jwt = require('jsonwebtoken');
const { superSecretPassword } = require('../config/config');
const UserModel = require('../models/userModel');

test = (req, res, next) => {
  console.log('it works');

  let allowed = true;
  if (allowed) {
    next();
  } else {
    res.status(400).json('access denied');
  }
};

authenticate = async (req, res, next) => {
  let token = req.header('x-auth-node');
  try {
    if (!token) throw 'error';
    let decoded = jwt.verify(token, superSecretPassword);
    let user = await UserModel.findOne({ _id: decoded.id, 'tokens.token': token });
    if (!user) throw 'error';
    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    res.status(400).json('You are not authorized');
  }
};

module.exports = {
  test,
  authenticate,
};
