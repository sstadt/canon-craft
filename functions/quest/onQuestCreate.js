
const functions = require('firebase-functions');

module.exports = functions.firestore
  .document('quests/{questId}')
  .onCreate(snapshot => {
    let date = Date.now();

    return snapshot.ref.update({
      created_on: date,
      last_updated: date
    });
  });
