const functions = require('firebase-functions');
const app = require('express')();
const FBAuth = require('./util/fbAuth');

const cors = require('cors');
app.use(cors());

const {
  getAllCases,
  postOneCase,
  getCase,
  deleteCase
} = require('./handlers/cases');
const {
  signup,
  signupCheckUser,
  login,
  uploadImage,
  addUserDetails,
  getUserDetails,
  verifyToken,
  emailVerify
} = require('./handlers/users');

// Scream routes
app.get('/cases', getAllCases);
app.post('/case', FBAuth, postOneCase);
app.get('/case/:caseId', getCase);
app.delete('/case/:caseId', FBAuth, deleteCase);

// users routes
app.post('/signup', signup);
app.get('/checkUser', signupCheckUser);
app.post('/verifyToken',verifyToken)
app.get('/SentEmail',emailVerify)
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);
app.get('/user/:userId', getUserDetails);

exports.api = functions.region('asia-northeast1').https.onRequest(app);