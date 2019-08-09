
const functions = require('firebase-functions');
const admin = require('../services/admin.js');

const db = admin.firestore();

module.exports = functions.auth.user()
  .onCreate((user) => {
    return db.collection('users').add({
      uid: user.uid,
      config: {},
      images: [],
      storageSize: 0,
      tier: {
        type: 'free',
        storageLimit: 10 * 1000 * 1000 // 10 MB limit
      }
    });
  });