
const changeHandler = (change, commit) => {
  switch (change.type) {
    case 'added':
      commit('ADD', { ...change.doc.data(), id: change.doc.id })
      break
    case 'modified':
      commit('UPDATE', { ...change.doc.data(), id: change.doc.id })
      break
    case 'removed':
      commit('REMOVE', change.doc.id)
      break
    default:
      console.warn('--- unhandled change type')
      console.warn(change.type)
  }
}

export const createWatcher = (ref, commit) => {
  return ref.onSnapshot(snapshot =>
    snapshot.docChanges().forEach(change =>
      changeHandler(change, commit)))
}
