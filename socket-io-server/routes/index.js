const router = require('express').Router();
const multer = require('multer');

// router.post('/postMessage');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({
  storage: storage,
});

const userController = require('../controllers/userController');
const channelController = require('../controllers/channelController');
const messageContoller = require('../controllers/messageContoller');
const middleware = require('../middleware/middleware');

//test routes
router.get('/', (req, res) => {
  res.send({ response: 'I am alive' }).status(200);
});
router.get('/getAllUsers', userController.getAllUsers);
router.get('/getAllChannels', channelController.getAllChannels);
router.get('/getAllMessages', messageContoller.getAllMessages);

//user routes
router.post('/user/register', userController.register);
router.post('/user/login', userController.login);
router.get('/user/logout', middleware.authenticate, userController.logout);
router.post('/user/changePassword', userController.changePassword);
router.post('/user/addContact', middleware.authenticate, userController.addContact);
router.post('/user/removeContact/:userId', middleware.authenticate, userController.removeContact);
router.get('/user/getContacts', middleware.authenticate, userController.getContacts);
router.get('/user/getChannels', middleware.authenticate, userController.getUserChannels);

//channel routes
router.post('/channel/create', middleware.authenticate, channelController.create);
router.post('/channel/update/:channelId', middleware.authenticate, channelController.update);
router.get('/channel/delete/:channelId', middleware.authenticate, channelController.del);
router.post(
  '/channel/addPerson/:channelId/:userId',
  middleware.authenticate,
  channelController.addPerson
);
router.get(
  '/channel/removePerson/:channelId/:userId',
  middleware.authenticate,
  channelController.removePerson
);
router.get('/channel/leave/:channelId', middleware.authenticate, channelController.leaveChannel);
router.get(
  '/channel/getUsers/:channelId',
  middleware.authenticate,
  channelController.getChannelUsers
);

//message routes
router.post('/sendMessage/:channelId', middleware.authenticate, messageContoller.send);
router.get(
  '/getMessages/:channelId/:skip/:limit',
  middleware.authenticate,
  messageContoller.getChannelMessages
);
router.get(
  '/getMessageCount/:channelId',
  middleware.authenticate,
  messageContoller.getChannelMsgCount
);
router.get('/getAllMessages', middleware.authenticate, messageContoller.getAllMessages);

module.exports = router;
