
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

  return new Promise((resolve, reject) => {
    db.collection('games').where('inviteLink', '==', invite).get()
      .then(games => {
        if (games.empty) {
          reject(new functions.https.HttpsError('invalid-argument', errorMessages.invalidInvite));
        } else {
          // TODO: *should* be unique, but need a
          //       more targeted way to do this update
          games.forEach(gameDoc => {
            let data = gameDoc.data();
            let players = data.players || [];
            let characters = data.characters || [];

            if (players.indexOf(userId) === -1) {
              players.push(userId);
              characters.push({
                player: userId,
                name: 'New Character',
                avatar: '//placehold.it/80x80'
              });
            }

            gameDoc.ref.update({ players, characters })
              .then(() => resolve({ game: gameDoc.id }));
          });
        }
      });
  });
});
