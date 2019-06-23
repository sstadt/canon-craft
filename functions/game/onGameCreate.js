
const functions = require('firebase-functions');
const { generateGameLink } = require('../services/game.js');

module.exports = functions.firestore
  .document('games/{gameId}')
  .onCreate(snapshot => {
    const gameLink = generateGameLink();

    return snapshot.ref.update({
      inviteLink: gameLink,
      created_on: new Date()
    });
  });
