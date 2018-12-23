
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

module.exports = functions.https.onCall((invite, context) => {
  const userId = context.auth.uid;

  console.log(`invite: ${invite}`);

  return new Promise((resolve, reject) => {
    db.collection('games')
      .where('inviteLink', '==', invite)
      .get()
      // .then(snapshot => {
      //   if (snapshot.empty) {
      //     return Promise.reject({
      //       type: 'invalid',
      //       message: 'Invitation is no longer valid, request the new link from you game master.'
      //     });
      //   } else {
      //     let gameId = false;
      //
      //     snapshot.forEach(item => {
      //       gameId = doc.id;
      //     })
      //
      //     return db.collection('games').doc()
      //   }
      // })
      .then(snapshot => {
        if (snapshot.empty) {
          reject({
            type: 'invalid',
            message: 'Invitation is no longer valid, request the new link from you game master.'
          });
        } else {
          snapshot.forEach(doc => {
            let players = doc.data().players;

            // console.log(JSON.stringify(doc));
            // console.log(doc.data().players);

            if (players.findIndex(player => player.id === userId) === -1) {
              players.push({
                id: userId,
                avatar: '//placehold.it/80x80'
              });
            }

            resolve({ invite, userId, players });
          })
        }
      });
  });
});
