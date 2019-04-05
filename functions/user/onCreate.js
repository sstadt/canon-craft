
const functions = require('firebase-functions');
const admin = require('../services/admin.js');

const db = admin.firestore();

module.exports = functions.auth.user()
  .onCreate((user) => {
    return new Promise((resolve, reject) => {
      const newCampaign = { 
        name: 'Default Campaign', 
        created_by: user.uid 
      };

      db.collection('campaigns').add(newCampaign)
        .then(campaign => {
          return db.collection('users').add({
            uid: user.uid,
            config: { defaultCampaign: campaign.id }
          });
        })
        .then(() => {
          resolve();
        });
    });
  });
