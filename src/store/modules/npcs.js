
// TODO: pull more NPCs in each time a game is loaded...
// ...do not remove watchers until logging out
var unsubscribeNpcs

const state = {
  all: []
}

const entryChangeHandler = (change, commit) => {
  switch (change.type) {
    case 'added':
      commit('ADD_NPC', { ...change.doc.data(), id: change.doc.id })
      break
    case 'modified':
      commit('UPDATE_NPC', { ...change.doc.data(), id: change.doc.id })
      break
    case 'removed':
      commit('REMOVE_NPC', change.doc.id)
      break
    default:
      console.warn('--- unhandled npc change type')
      console.warn(change.type)
  }
}

const mutations = {
  ADD_NPC (state, npc) {
    state.all.push(npc)
  },
  UPDATE_NPC (state, npc) {
    let index = state.all.findIndex(item => item.id === npc.id)
    state.all.splice(index, 1, npc)
  },
  REMOVE_NPC (state, npcId) {
    let index = state.all.findIndex(item => item.id === npcId)
    state.all.splice(index, 1)
  },
  CLEAR_NPCS (state) {
    state.all = []
  }
}

const actions = {
  populate ({ rootState, commit }, campaignId) {
    let journalEntriesRef = rootState.npcsCollection.where('campaign', '==', campaignId)

    if (unsubscribeNpcs) {
      unsubscribeNpcs()
    }

    unsubscribeNpcs = journalEntriesRef.onSnapshot(snapshot =>
      snapshot.docChanges().forEach(change =>
        entryChangeHandler(change, commit)))
  },
  create ({ rootState }, npc) {
    rootState.npcsCollection.add(npc)
  },
  update ({ rootState }, npc) {
    let updatedNpc = {}

    for (let key in npc) {
      if (npc.hasOwnProperty(key) && key !== 'id') {
        updatedNpc[key] = npc[key]
      }
    }

    rootState.npcsCollection.doc(npc.id).set(updatedNpc, { merge: true })
  },
  remove ({ rootState }, npcId) {
    rootState.npcsCollection.doc(npcId).delete()
  },
  clear ({ commit }) {
    unsubscribeNpcs()
    commit('CLEAR_NPCS')
  }
}

export default { namespaced: true, state, mutations, actions }
