
const functions = require('firebase-functions');

const admin = require('../services/admin.js');
const { getStorageLeftInBytes } = require('../services/storage.js');

module.exports = functions.https.onCall(({ path }, context) => {
  const uid = context.auth.uid;

  return new Promise((resolve, reject) => {
    getStorageLeftInBytes(uid)
      .then(storageLeft => {
        const metadata = {
          storageLeftInBytes: Number(storageLeft),
          path
        };

        return admin.auth().createCustomToken(uid, metadata)
          .then(token => resolve({ token }));
      });
  });
});
