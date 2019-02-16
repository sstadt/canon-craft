
var unsubscribeOwnedQuests
var unsubscribePlayedQuests

const setupGamesWatcher = (ref, commit) => {
  return ref.onSnapshot(snapshot =>
    snapshot.docChanges().forEach(change =>
      questChangeHandler(change, commit)))
}

const questChangeHandler = (change, commit) => {
  switch (change.type) {
    case 'added':
      commit('ADD_QUEST', { ...change.doc.data(), id: change.doc.id })
      break
    case 'modified':
      commit('UPDATE_QUEST', { ...change.doc.data(), id: change.doc.id })
      break
    case 'removed':
      commit('REMOVE_QUEST', change.doc.id)
      break
    default:
      console.warn('--- unhandled quest change type')
      console.warn(change.type)
  }
}

const state = {
  all: []
}

const mutations = {
  ADD_QUEST (state, quest) {
    state.all.push(quest)
  },
  UPDATE_QUEST (state, quest) {
    let index = state.all.findIndex(item => item.id === quest.id)
    state.all.splice(index, 1, quest)
  },
  REMOVE_QUEST (state, gameId) {
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
    let ownedQuestRef = rootState.db.collection('quests')
      .where('created_by', '==', userId)
    let playedQuestRef = rootState.db.collection('quests')
      .where('players', 'array-contains', userId)

    unsubscribeOwnedQuests = setupGamesWatcher(ownedQuestRef, commit)
    unsubscribePlayedQuests = setupGamesWatcher(playedQuestRef, commit)
  },
  create ({ rootState }, quest) {
    let gamesRef = rootState.db.collection('quests')
    gamesRef.add(quest)
  },
  update ({ rootState }, quest) {
    let questRef = rootState.db.collection('quests').doc(quest.id)
    let updatedQuest = {}

    for (let key in quest) {
      if (quest.hasOwnProperty(key) && key !== 'id') {
        updatedQuest[key] = quest[key]
      }
    }

    questRef.set(updatedQuest, { merge: true })
  },
  remove ({ rootState }, questId) {
    rootState.db.collection('quests').doc(questId).delete()
  },
  clear ({ commit }) {
    unsubscribeOwnedQuests()
    unsubscribePlayedQuests()
    commit('CLEAR_QUESTS')
  }
}

export default { namespaced: true, state, mutations, actions }
