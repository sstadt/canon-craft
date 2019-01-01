
var gameRefs = {};
var gameUnsubscribes = [];

const populateGame = (gameId, rootState, commit) => {
  console.log(`populating quests for ${gameId}`)
  if (!gameRefs[gameId]) {
    gameRefs[gameId] = rootState.db.collection('quests').where('game', '==', gameId)

    commit('GAME_POPULATED', gameId)

    let unsubscribe = gameRefs[gameId].onSnapshot(snapshot =>
      snapshot.docChanges().forEach(change =>
        characterChangeHandler(change, commit)))

    gameUnsubscribes.push(unsubscribe)
  }
}

const characterChangeHandler = (change, commit) => {
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
  all: [],
  populatedGames: []
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
  CLEAR_GAMES () {
    for (let i = 0, j = gameUnsubscribes.length; i < j; i++) {
      gameUnsubscribes[i]()
    }

    gameRefs = {}
    gameUnsubscribes = []
  }
}

const actions = {
  populate ({ rootState, commit }, gameId) {
    populateGame(gameId, rootState, commit)
  },
  update ({ rootState }, quest) {
    let charRef = rootState.db.collection('quests').doc(quest.id)
    let updatedCharacter = {}

    for (let key in quest) {
      if (quest.hasOwnProperty(key) && key !== 'id') {
        updatedCharacter[key] = quest[key]
      }
    }

    charRef.set(updatedCharacter, { merge: true })
  },
  clear ({ commit }) {
    commit('CLEAR_GAMES')
  }
}

export default { namespaced: true, state, mutations, actions }
