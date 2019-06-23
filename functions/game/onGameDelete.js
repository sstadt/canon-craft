
const functions = require('firebase-functions');
const admin = require('../services/admin.js');

const db = admin.firestore();

module.exports = functions.firestore
  .document('games/{gameId}')
  .onDelete((snapshot, context) => {
    // TODO: check context to see if the ID can be pulled from there.
    // https://firebase.google.com/docs/reference/functions/functions.EventContext.html
    // const game = snapshot.data();

    return new Promise((resolve, reject) => {
      reject();
      // batch delete; need to grab journal entries and run this to delete them
      // db.collection('games').doc(context.params.gameId).collection('journalEntries').get()
      //   .then(function(querySnapshot) {
      //     // Once we get the results, begin a batch
      //     var batch = db.batch();
      
      //     querySnapshot.forEach(function(doc) {
      //       // For each doc, add a delete operation to the batch
      //       batch.delete(doc.ref);
      //     });
      
      //     // Commit the batch
      //     return.batch.commit();
      //   }).then(function() {
      //     resolve();
      //   }); 
    });
  });



