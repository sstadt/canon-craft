
var gameWatchers = {};

const populateGame = (gameId, rootState, commit) => {
  if (!gameWatchers[gameId]) {
    gameWatchers[gameId] = rootState.charactersCollection.where('game', '==', gameId)

    commit('GAME_POPULATED', gameId)

    gameWatchers[gameId].onSnapshot(snapshot =>
      snapshot.docChanges().forEach(change =>
        characterChangeHandler(change, commit)))
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
      console.warn('--- unhandled character change type')
      console.warn(change.type)
  }
}

const state = {
  all: [],
  populatedGames: []
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
  },
  GAME_POPULATED (state, gameId) {
    state.populatedGames.push(gameId)
  }
}

const actions = {
  populate ({ rootState, commit }, gameId) {
    populateGame(gameId, rootState, commit)
  },
  update ({ rootState }, character) {
    let charRef = rootState.charactersCollection.doc(character.id)
    let updatedCharacter = {}

    for (let key in character) {
      if (character.hasOwnProperty(key) && key !== 'id') {
        updatedCharacter[key] = character[key]
      }
    }

    charRef.set(updatedCharacter, { merge: true })
  }
}

export default { namespaced: true, state, mutations, actions }
