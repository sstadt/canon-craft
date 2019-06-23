
import { createWatcher } from '@/lib/util.firebase.js'

var unsubscribeOwnedGames
var unsubscribePlayedGames

const state = {
  all: []
}

const mutations = {
  ADD (state, game) {
    state.all.push(game)
  },
  UPDATE (state, game) {
    let index = state.all.findIndex(item => item.id === game.id)
    state.all.splice(index, 1, game)
  },
  REMOVE (state, gameId) {
    let index = state.all.findIndex(item => item.id === gameId)
    state.all.splice(index, 1)
  },
  CLEAR_GAMES () {
    state.all = []
  }
}

const actions = {
  populate ({ commit, rootState }) {
    let userId = rootState.user.currentUser.uid
    let ownedGamesRef = rootState.gamesCollection.where('created_by', '==', userId)
    let playedGamesRef = rootState.gamesCollection.where('players', 'array-contains', userId)

    unsubscribeOwnedGames = createWatcher(ownedGamesRef, commit)
    unsubscribePlayedGames = createWatcher(playedGamesRef, commit)
  },
  create ({ rootState }, { name, created_by }) {
    let gamesRef = rootState.gamesCollection

    gamesRef.add({
      name,
      created_by,
      description: '',
      players: [],
      journal: [],
      config: {}
    })
  },
  update ({ rootState }, game) {
    let gameRef = rootState.gamesCollection.doc(game.id)
    let updatedGame = {}

    for (let key in game) {
      if (game.hasOwnProperty(key) && key !== 'id') {
        updatedGame[key] = game[key]
      }
    }

    gameRef.set(updatedGame, { merge: true })
  },
  clear ({ commit }) {
    unsubscribeOwnedGames()
    unsubscribePlayedGames()
    commit('CLEAR_GAMES')
  }
}

export default { namespaced: true, state, mutations, actions }
