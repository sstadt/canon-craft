
import { createWatcher } from '@/lib/util.firebase.js'

var unsubscribeEntries

const state = {
  ref: null,
  gameId: '',
  entries: []
}

const mutations = {
  ADD (state, entry) {
    state.entries.push(entry)
  },
  UPDATE (state, entry) {
    let index = state.entries.findIndex(item => item.id === entry.id)
    state.entries.splice(index, 1, entry)
  },
  REMOVE (state, entryId) {
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

    if (unsubscribeEntries) unsubscribeEntries()
    unsubscribeEntries = createWatcher(journalEntriesRef, commit)
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
  remove ({ state }, entryId) {
    state.ref.doc(entryId).delete()
  },
  clear ({ commit }) {
    if (unsubscribeEntries) unsubscribeEntries()
    commit('CLEAR_ENTRIES')
    commit('SET_GAME', '')
    commit('SET_REF', null)
  }
}

export default { namespaced: true, state, mutations, actions }
