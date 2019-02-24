
/**
 * joinGame
 *
 * Payload expects the invite to process in string format.
 *
 * @returns game string pushId of the game that was joined
 */

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

const errorMessages = {
  invalidInvite: 'Invitation is no longer valid, request the new link from your game master.'
};

module.exports = functions.https.onCall((invite, context) => {
  const userId = context.auth.uid;

  let game;
  let gameId;
  let newJoin = false;

  return new Promise((resolve, reject) => {
    db.collection('games').where('inviteLink', '==', invite).get()
      .then(games => {
        if (games.empty) {
          return reject(new functions.https.HttpsError('invalid-argument', errorMessages.invalidInvite));
        }

        games.forEach(gameDoc => {
          game = gameDoc;
        });

        let data = game.data();
        let players = data.players || [];

        gameId = game.id;

        if (players.indexOf(userId) === -1) {
          players.push(userId);
          newJoin = true;
        }

        return game.ref.update({ players });
      })
      .then(() => {
        if (newJoin) {
          return db.collection('characters').add({
            game: gameId,
            player: userId,
            name: 'New Character',
            avatar: '//placehold.it/80x80',
            url: ''
          })
        }

        return;
      })
      .then(() => {
        resolve({ game: gameId })
      });
  });
});
