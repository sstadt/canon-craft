
const admin = require('../services/admin.js');
const db = admin.firestore();

exports.getProfile = uid => {
  return new Promise((resolve, reject) => {
    db.collection('users').where('uid', '==', uid).get()
      .then(users => {
        users.forEach(user => resolve(user.data()));
      });
  });
};
