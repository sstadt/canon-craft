
const functions = require('firebase-functions');
const { Storage } = require('@google-cloud/storage');

const admin = require('../services/admin.js');
const db = admin.firestore();
const serviceAccount = require('../service-account.json');

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT,
  credentials: serviceAccount
});

const storageBucket = `${process.env.GCLOUD_PROJECT}.appspot.com`;

const storageInBytes = uid => {
  return new Promise((resolve, reject) => {
    storage.bucket(storageBucket).getFiles({ query: { prefix: uid } }, (err, files) => {
      if (err) {
        reject(err);
        return;
      }

      if (!files || !files.length) {
        resolve(0);
        return;
      }

      resolve(files.map(file => Number(file.metadata.size)).reduce((a, b) => a + b, 0));
    });
  });
}

const getStorageLeftInBytes = uid => {
  return getProfile(uid).then(profile => {
    return storageInBytes(uid).then(storageInBytes => {
      console.log(profile)
      const storageLimitInBytes = profile.tier.storageLimit;
      return storageLimitInBytes - storageInBytes;
    });
  });
}

const getProfile = uid => {
  return new Promise((resolve, reject) => {
    db.collection('users').doc(uid).get()
      .then(snapshot => {
        resolve(snapshot.data())
      });
  });
  // return admin.database().ref(`users/${uid}`).once('value').then(snapshot => {
  //   return snapshot.data() || this.none;
  // });
}

module.exports = functions.https.onCall(({ path }, context) => {
  const uid = context.auth.uid;

  return new Promise((resolve, reject) => {
    getStorageLeftInBytes(uid).then(storageLeft => {
      const metadata = {
        storageLeftInBytes: Number(storageLeft),
        path
      };

      return admin.auth().createCustomToken(uid, metadata).then(token => resolve({ token }));
    });
  });
});
