
const functions = require('firebase-functions');
const { generateGameLink } = require('../services/game.js');

module.exports = functions.firestore
  .document('games/{gameId}')
  .onCreate((snapshot, context) => {
    const gameData = snapshot.data();
    const gameLink = generateGameLink(gameData.id);
    console.log(gameLink);

    return snapshot.ref.update({ inviteLink: gameLink });
  });
