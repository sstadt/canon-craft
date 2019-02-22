
var unsubscribeEntries

const state = {
  ref: null,
  gameId: '',
  entries: []
}

const entryChangeHandler = (change, commit) => {
  switch (change.type) {
    case 'added':
      commit('ADD_ENTRY', { ...change.doc.data(), id: change.doc.id })
      break
    case 'modified':
      commit('UPDATE_ENTRY', { ...change.doc.data(), id: change.doc.id })
      break
    case 'removed':
      commit('REMOVE_ENTRY', change.doc.id)
      break
    default:
      console.warn('--- unhandled quest change type')
      console.warn(change.type)
  }
}

const mutations = {
  ADD_ENTRY (state, entry) {
    state.entries.push(entry)
  },
  UPDATE_ENTRY (state, entry) {
    let index = state.entries.findIndex(item => item.id === entry.id)
    state.entries.splice(index, 1, entry)
  },
  REMOVE_ENTRY (state, entryId) {
    let index = state.entries.findIndex(item => item.id === entryId)
    state.entries.splice(index, 1)
  },
  SET_GAME (state, gameId) {
    state.gameId = gameId
  },
  CLEAR_ENTRIES (state) {
    state.entries = []
  },
  SET_REF (state, ref) {
    state.ref = ref
  }
}

const actions = {
  populate ({ rootState, commit }, gameId) {
    let journalEntriesRef = rootState.gamesCollection.doc(gameId)
      .collection('journalEntries')

    if (unsubscribeEntries) {
      unsubscribeEntries()
    }

    unsubscribeEntries = journalEntriesRef.onSnapshot(snapshot =>
      snapshot.docChanges().forEach(change =>
        entryChangeHandler(change, commit)))

    commit('SET_GAME', gameId)
    commit('SET_REF', journalEntriesRef)
  },
  create ({ state }, entry) {
    state.ref.add(entry)
  },
  update ({ state }, entry) {
    let updatedEntry = {}

    for (let key in entry) {
      if (entry.hasOwnProperty(key) && key !== 'id') {
        updatedEntry[key] = entry[key]
      }
    }

    state.ref.doc(entry.id).set(updatedEntry, { merge: true })
  },
  remove ({ rootState, state }, entryId) {
    state.ref.doc(entryId).delete()
  },
  clear ({ commit }) {
    unsubscribeEntries()
    commit('CLEAR_ENTRIES')
    commit('SET_GAME', '')
    commit('SET_REF', null)
  }
}

export default { namespaced: true, state, mutations, actions }
