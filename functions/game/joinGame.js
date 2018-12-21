
const functions = require('firebase-functions');

module.exports = functions.https.onCall((invite, context) => {
  return { invite, user: context.auth.uid };
});
