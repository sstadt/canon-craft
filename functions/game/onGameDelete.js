
const functions = require('firebase-functions');
const admin = require('../services/admin.js');
const { batchDelete } = require('../services/collection.js');

const db = admin.firestore();

module.exports = functions.firestore
  .document('games/{gameId}')
  .onDelete((snapshot) => {
    let gameId = snapshot.id;

    return new Promise((resolve) => {
      db.collection('games').doc(gameId).collection('journalEntries').get()
        .then(function(querySnapshot) {
          return batchDelete(db, querySnapshot)
        }).then(function() {
          return db.collection('quests').where('game', '==', gameId).get();
        }).then(function(querySnapshot) {
          return batchDelete(db, querySnapshot)
        }).then(function() {
          resolve();
        });
    });
  });



