const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  firstname: String,
  lastname: String,
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  avatarUrl: {
    type: String,
    default:
      'https://sm.ign.com/t/ign_za/feature/n/netflixs-a/netflixs-avatar-series-does-the-last-airbender-really-need-t_scm4.1200.jpg',
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
  contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  channels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Channel' }],
  tokens: [
    {
      token: String,
      role: String,
    },
  ],
});

UserSchema.pre('find', function (next) {
  let query = this;
  query.select('-password').select('-tokens');
  next();
});

UserSchema.pre('save', function (next) {
  let user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(user.password, salt, function (err, hash) {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
