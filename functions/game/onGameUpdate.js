
const functions = require('firebase-functions');
const { generateGameLink } = require('../services/game.js');

module.exports = functions.firestore
  .document('games/{gameId}')
  .onUpdate((change, context) => {
    const gameData = change.after.data();

    if (!gameData.inviteLink) {
      let updates = { inviteLink: generateGameLink() };
      return change.after.ref.set(updates, { merge: true });
    } else {
      return true;
    }
  });
