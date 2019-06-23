
import { createWatcher } from '@/lib/util.firebase.js'

var gameWatchers = {}

const state = {
  all: [],
  populatedGames: []
}

const mutations = {
  ADD (state, character) {
    state.all.push(character)
  },
  UPDATE (state, character) {
    let index = state.all.findIndex(item => item.id === character.id)
    state.all.splice(index, 1, character)
  },
  REMOVE (state, gameId) {
    let index = state.all.findIndex(item => item.id === gameId)
    state.all.splice(index, 1)
  },
  GAME_POPULATED (state, gameId) {
    state.populatedGames.push(gameId)
  }
}

const actions = {
  populate ({ rootState, commit }, gameId) {
    if (!gameWatchers[gameId]) {
      let gameCharactersRef = rootState.charactersCollection.where('game', '==', gameId)
      
      gameWatchers[gameId] = createWatcher(gameCharactersRef, commit)
      commit('GAME_POPULATED', gameId)
    }
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
