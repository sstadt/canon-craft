
import { createWatcher } from '@/lib/util.firebase.js'

var unsubscribeOwnedNpcs
var unsubscribeSharedNpcs

const state = {
  all: []
}

const mutations = {
  ADD (state, npc) {
    state.all.push(npc)
  },
  UPDATE (state, npc) {
    let index = state.all.findIndex(item => item.id === npc.id)
    state.all.splice(index, 1, npc)
  },
  REMOVE (state, npcId) {
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

        if (data) {
          dispatch('sidepanel/showContent', { type, data }, { root: true })
        } else {
          dispatch('toast/send', 'NPC not found', { root: true })
        }
      }
    })
  },
  populate ({ rootState, commit }) {
    let userId = rootState.user.currentUser.uid
    let ownedNpcsRef = rootState.npcsCollection.where('created_by', '==', userId)
    let sharedNpcsRef = rootState.npcsCollection.where('players', 'array-contains', userId)

    unsubscribeOwnedNpcs = createWatcher(ownedNpcsRef, commit)
    unsubscribeSharedNpcs = createWatcher(sharedNpcsRef, commit)
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
