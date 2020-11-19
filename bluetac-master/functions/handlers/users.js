const { admin, db } = require("../util/admin");

const config = require("../util/config");
const { uuid } = require("uuidv4");

const firebase = require("firebase");
firebase.initializeApp(config);

const {
  validateSignupData,
  validateLoginData,
  reduceUserDetails,
  validateSignupEmail,
} = require("../util/validators");

//Listen for auth status changes
//todo:client needs to listen to this endpoints
firebase.auth().onAuthStateChanged((user)=>{
  if(user){
    console.log("User logged in")
  }else{
    console.log("User logged out")
  }
})


//Check user exists before signup
exports.signupCheckUser = (req, res) => {
  const { email } = req.query;
  const { valid, errors } = validateSignupEmail(email);

  if (!valid) return res.status(400).json(errors);

  const noImg = "no-img.png";

  firebase.auth().fetchSignInMethodsForEmail(email)
    .then((data) => {
      if(data && data.length > 0){
        return res.status(200).json({ userExists: true });
      } else if(data && data.length === 0) {
        return res.status(200).json({ userExists: false });
      }
    })
    .catch((err) => {
      console.log('printing error');
      console.error(err);
    });
};

// Sign users up
exports.signup = async(req, res) => {
  const newUser = {
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    country:req.body.country
  };

  //Todo: User Data Validation
  // const { valid, errors } = validateSignupData(newUser);
  // if (!valid) return res.status(400).json(errors);

  const noImg = "no-img.png";
  let token, userId;

  firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then((data)=> {
        userId = data.user.uid;
        token = data.user.getIdToken();
        return data.user.sendEmailVerification();
      })
      .then(()=> {
        const userCredentials = {
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          country: newUser.country,
          createdAt: new Date().toISOString(),
          //TODO Append token to imageUrl. Work around just add token from image in storage.
          imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
          userId,
        };
        //return db.doc(`/users/${newUser.handle}`).set(userCredentials);
        return db.collection('users').doc(userId).set(userCredentials)
      })
       .then((result)=>{
            res.status(201).json({
              Success:`User ${userId} created Successfully`,
              token:token.i
         })
       })
      .catch((err) => {
        console.error(err);
        if (err.code === "auth/email-already-in-use") {
          return res.status(400).json({ email: "Email is already is use" });
        }
        else if(err.code==='auth/weak-password'){
          return res.status(400).json({error:"Weak Password"})
        }
        else {
          return res
              .status(500)
              .json({ general: "Something went wrong, please try again" });
        }
      });

};

// Log user in
exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  const { valid, errors } = validateLoginData(user);

  if (!valid) return res.status(400).json(errors);

  try{
    firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((data) => {
          if (!data.user.emailVerified) {
            throw Error('Please verify your email before SignIn');
            //res.send("Email sent")
          } else {
            return data.user.getIdToken();
          }
        })
        .then((token) => {
          return res.json({ token });
        })
        .catch((err) => {
          return res.status(400).json({error:err.message})
        });
  }catch(e){
    res.status(400).json({error:e.message})
  }


};

exports.emailVerify =(req,res,next)=>{
  const {user} = req.body
  user.user.sendEmailVerification().then(function() {
    // Email sent.
    res.send("Email sent")
  }).catch(function(error) {
    // An error happened.
    console.log(error)
    res.status(400).json({error:error.message})
  });
}

exports.verifyToken=(req,res,next)=>{
    let idToken;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer ')
    ) {
      idToken = req.headers.authorization.split('Bearer ')[1];
    } else {
      console.error('No token found');
      return res.status(403).json({ error: 'Unauthorized' });
    }

    admin
        .auth()
        .verifyIdToken(idToken)
        .then((decodedToken) => {
          req.user = decodedToken;
          return res.status(200).json({
            Message:"Valid Token",
            User:req.user
          });
        })
        .catch((err) => {
          console.error('Error while verifying token ', err);
          return res.status(403).json(err);
        });
  };




// Add user details
exports.addUserDetails = (req, res) => {
  let userDetails = reduceUserDetails(req.body);

  db.doc(`/users/${req.user.userId}`)
    .update(userDetails)
    .then(() => {
      return res.json({ message: "Details added successfully" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
// Get any user's details
exports.getUserDetails = (req, res) => {
  console.log(req.params);
  let userData = {};
  db.doc(`/users/${req.params.userId}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData.user = doc.data();
        return res.json(userData);
      } else {
        return res.status(404).json({ error: "User not found" });
      }
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
// Upload a profile image for user
exports.uploadImage = (req, res) => {
  const BusBoy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");

  const busboy = new BusBoy({ headers: req.headers });

  let imageToBeUploaded = {};
  let imageFileName;
  // String for image token
  let generatedToken = uuid();

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    console.log(fieldname, file, filename, encoding, mimetype);
    if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
      return res.status(400).json({ error: "Wrong file type submitted" });
    }
    // my.image.png => ['my', 'image', 'png']
    const imageExtension = filename.split(".")[filename.split(".").length - 1];
    // 32756238461724837.png
    imageFileName = `${Math.round(
      Math.random() * 1000000000000
    ).toString()}.${imageExtension}`;
    const filepath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filepath, mimetype };
    file.pipe(fs.createWriteStream(filepath));
  });
  busboy.on("finish", () => {
    admin
      .storage()
      .bucket()
      .upload(imageToBeUploaded.filepath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype,
            //Generate token to be appended to imageUrl
            firebaseStorageDownloadTokens: generatedToken,
          },
        },
      })
      .then(() => {
        // Append token to url
        console.log("$$$$$$$$$$$$$$$$$$$$$$$", req.user.uid);
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media&token=${generatedToken}`;
        return db.doc(`/users/${req.user.uid}`).update({ imageUrl });
      })
      .then(() => {
        return res.json({ message: "image uploaded successfully" });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: "something went wrong" });
      });
  });
  busboy.end(req.rawBody);
};

exports.markNotificationsRead = (req, res) => {
  let batch = db.batch();
  req.body.forEach((notificationId) => {
    const notification = db.doc(`/notifications/${notificationId}`);
    batch.update(notification, { read: true });
  });
  batch
    .commit()
    .then(() => {
      return res.json({ message: "Notifications marked read" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
