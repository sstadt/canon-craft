
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
  }
}

const actions = {
  init ({ commit, rootState }) {
    let gamesRef = rootState.db.collection('games').where('created_by', '==', rootState.user.currentUser.uid)

    gamesRef.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        switch (change.type) {
          case 'added':
            commit('ADD_GAME', { ...change.doc.data(), id: change.doc.id })
            break;
          case 'modified':
            commit('UPDATE_GAME', { ...change.doc.data(), id: change.doc.id })
            break;
          default:
            console.warn('--- unhandled game change type')
            console.warn(change.type)
        }
      })
    })
  },
  create ({ rootState }, { name, created_by }) {
    let gamesRef = rootState.db.collection('games')

    gamesRef.add({
      name,
      created_by,
      created_on: new Date()
    })
  },
  update ({ rootState }, game) {
    let gameRef = rootState.db.collection('games').doc(game.id)
    let updatedGame = {}

    for (let key in game) {
      if (game.hasOwnProperty(key) && key !== 'id') {
        updatedGame[key] = game[key]
      }
    }

    gameRef.set(updatedGame, { merge: true })
  }
}

export default { namespaced: true, state, mutations, actions }
