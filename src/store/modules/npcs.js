
var unsubscribeOwnedNpcs
var unsubscribeSharedNpcs

const setupNpcsWatcher = (ref, commit) => {
  return ref.onSnapshot(snapshot =>
    snapshot.docChanges().forEach(change =>
      npcChangeHandler(change, commit)))
}

const npcChangeHandler = (change, commit) => {
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

const state = {
  all: []
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
  init ({ state, dispatch }) {
    document.addEventListener('click', e => {
      let type = e.target.dataset.mentionType

      if (type === 'npc') {
        let id = e.target.dataset.mentionId
        let data = state.all.find(npc => npc.id === id)

        dispatch('sidepanel/showContent', { type, data }, { root: true })
      }
    })
  },
  populate ({ rootState, commit }) {
    let userId = rootState.user.currentUser.uid
    let ownedNpcsRef = rootState.npcsCollection.where('created_by', '==', userId)
    let sharedNpcsRef = rootState.npcsCollection.where('players', 'array-contains', userId)

    unsubscribeOwnedNpcs = setupNpcsWatcher(ownedNpcsRef, commit)
    unsubscribeSharedNpcs = setupNpcsWatcher(sharedNpcsRef, commit)
  },
  create ({ rootState }, npc) {
    rootState.npcsCollection.add(npc)
  },
  update ({ rootState }, npc) {
    let npcRef = rootState.npcsCollection.doc(npc.id)
    let updatedNpc = {}

    for (let key in npc) {
      if (npc.hasOwnProperty(key) && key !== 'id') {
        updatedNpc[key] = npc[key]
      }
    }

    npcRef.set(updatedNpc, { merge: true })
  },
  remove ({ rootState }, npcId) {
    rootState.npcsCollection.doc(npcId).delete()
  },
  clear ({ commit }) {
    unsubscribeOwnedNpcs()
    unsubscribeSharedNpcs()
    commit('CLEAR_NPCS')
  }
}

export default { namespaced: true, state, mutations, actions }
