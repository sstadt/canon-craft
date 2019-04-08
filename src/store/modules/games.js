
var unsubscribeOwnedGames;
var unsubscribePlayedGames;

const setupGamesWatcher = (ref, commit) => {
  return ref.onSnapshot(snapshot =>
    snapshot.docChanges().forEach(change =>
      gameChangeHandler(change, commit)))
}

const gameChangeHandler = (change, commit) => {
  switch (change.type) {
    case 'added':
      commit('ADD_GAME', { ...change.doc.data(), id: change.doc.id })
      break
    case 'modified':
      commit('UPDATE_GAME', { ...change.doc.data(), id: change.doc.id })
      break
    case 'removed':
      commit('REMOVE_GAME', change.doc.id)
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
  ADD_GAME (state, game) {
    state.all.push(game)
  },
  UPDATE_GAME (state, game) {
    let index = state.all.findIndex(item => item.id === game.id)
    state.all.splice(index, 1, game)
  },
  REMOVE_GAME (state, gameId) {
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

    unsubscribeOwnedGames = setupGamesWatcher(ownedGamesRef, commit)
    unsubscribePlayedGames = setupGamesWatcher(playedGamesRef, commit)
  },
  create ({ rootState }, { name, created_by, campaign }) {
    let gamesRef = rootState.gamesCollection

    gamesRef.add({
      name,
      created_by,
      campaign,
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
