
var gameWatchers = {};

const populateGame = (gameId, rootState, commit) => {
  if (!gameWatchers[gameId]) {
    console.log(`populating characters for ${gameId}`)
    gameWatchers[gameId] = rootState.db.collection('characters').where('game', '==', gameId)

    gameWatchers[gameId].onSnapshot(snapshot =>
      snapshot.docChanges().forEach(change =>
        characterChangeHandler(change, commit)))
  } else {
    console.log('already populated')
  }
}

const characterChangeHandler = (change, commit) => {
  switch (change.type) {
    case 'added':
      commit('ADD_CHARACTER', { ...change.doc.data(), id: change.doc.id })
      break
    case 'modified':
      commit('UPDATE_CHARACTER', { ...change.doc.data(), id: change.doc.id })
      break
    case 'removed':
      commit('REMOVE_CHARACTER', change.doc.id)
      break
    default:
      console.warn('--- unhandled game change type')
      console.warn(change.type)
  }
}

const state = {
  all: []
}

const mutations = {
  ADD_CHARACTER (state, character) {
    state.all.push(character)
  },
  UPDATE_CHARACTER (state, character) {
    let index = state.all.findIndex(item => item.id === character.id)
    state.all.splice(index, 1, character)
  },
  REMOVE_CHARACTER (state, gameId) {
    let index = state.all.findIndex(item => item.id === gameId)
    state.all.splice(index, 1)
  }
}

const actions = {
  populate ({ rootState, commit }, gameId) {
    populateGame(gameId, rootState, commit)
  }
}

export default { namespaced: true, state, mutations, actions }
