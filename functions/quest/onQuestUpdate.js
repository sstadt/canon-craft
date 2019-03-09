
const functions = require('firebase-functions');

const questHasChanged = (before, after) => {
  delete before.last_updated;
  delete after.last_updated;

  return JSON.stringify(before) !== JSON.stringify(after);
};

module.exports = functions.firestore
  .document('quests/{questId}')
  .onUpdate(change => {
    let before = change.before.data();
    let after = change.after.data();
    let last_updated = Date.now();

    if (!questHasChanged(before, after)) {
      return null;
    }

    return change.after.ref.update({ last_updated });
  });
