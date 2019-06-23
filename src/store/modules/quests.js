
import { createWatcher } from '@/lib/util.firebase.js'

var unsubscribeOwnedQuests
var unsubscribePlayedQuests

const state = {
  all: []
}

const mutations = {
  ADD (state, quest) {
    state.all.push(quest)
  },
  UPDATE (state, quest) {
    let index = state.all.findIndex(item => item.id === quest.id)
    state.all.splice(index, 1, quest)
  },
  REMOVE (state, gameId) {
    let index = state.all.findIndex(item => item.id === gameId)
    state.all.splice(index, 1)
  },
  GAME_POPULATED (state, gameId) {
    state.populatedGames.push(gameId)
  },
  CLEAR_QUESTS (state) {
    state.all = []
  }
}

const actions = {
  populate ({ rootState, commit }) {
    let userId = rootState.user.currentUser.uid
    let ownedQuestRef = rootState.questsCollection.where('created_by', '==', userId)
    let playedQuestRef = rootState.questsCollection.where('players', 'array-contains', userId)

    unsubscribeOwnedQuests = createWatcher(ownedQuestRef, commit)
    unsubscribePlayedQuests = createWatcher(playedQuestRef, commit)
  },
  create ({ rootState }, quest) {
    rootState.questsCollection.add(quest)
  },
  update ({ rootState }, quest) {
    let questRef = rootState.questsCollection.doc(quest.id)
    let updatedQuest = {}

    for (let key in quest) {
      if (quest.hasOwnProperty(key) && key !== 'id') {
        updatedQuest[key] = quest[key]
      }
    }

    questRef.set(updatedQuest, { merge: true })
  },
  remove ({ rootState }, questId) {
    rootState.questsCollection.doc(questId).delete()
  },
  clear ({ commit }) {
    unsubscribeOwnedQuests()
    unsubscribePlayedQuests()
    commit('CLEAR_QUESTS')
  }
}

export default { namespaced: true, state, mutations, actions }
