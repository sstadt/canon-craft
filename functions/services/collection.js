
function batchDelete (db, snapshot) {
  var batch = db.batch();
      
  snapshot.forEach(function(doc) {
    batch.delete(doc.ref);
  });

  return batch.commit();
}

module.exports = {
  batchDelete
}