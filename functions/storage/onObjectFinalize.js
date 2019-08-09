
const functions = require('firebase-functions');
const admin = require('../services/admin.js');

const db = admin.firestore();

module.exports = functions.storage.object()
  .onFinalize(object => {
    const uid = object.name.split('/')[0];
    const size = parseInt(object.size, 10);

    let user;

    return db.collection('users').where('uid', '==', uid).get()
      .then(users => {
        users.forEach(userDoc => {
          user = userDoc;
        });

        let data = user.data();
        let storageSize = parseInt(data.storageSize, 10) || 0;

        storageSize += size;

        return user.ref.update({ storageSize })
      });
  });
