
const { Storage } = require('@google-cloud/storage');

const { getProfile } = require('../services/user.js');
const serviceAccount = require('../service-account.json');

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT,
  credentials: serviceAccount
});

const storageBucket = `${process.env.GCLOUD_PROJECT}.appspot.com`;

exports.storageInBytes = uid => {
  return new Promise((resolve, reject) => {
    storage.bucket(storageBucket).getFiles({ query: { prefix: uid } }, (err, files) => {
      if (err) {
        reject(err);
        return;
      }

      if (!files || !files.length) {
        resolve(0);
        return;
      }

      resolve(files.map(file => Number(file.metadata.size)).reduce((a, b) => a + b, 0));
    });
  });
};

exports.getStorageLeftInBytes = uid => {
  return getProfile(uid).then(profile => {
    return this.storageInBytes(uid).then(storageInBytes => {
      const storageLimitInBytes = profile.tier.storageLimit;
      return storageLimitInBytes - storageInBytes;
    });
  });
};
