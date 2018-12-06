
const state = {
  all: []
}

const mutations = {
  ADD_GAME (state, game) {
    state.all.push(game)
  }
}

const actions = {
  init ({ commit, rootState }) {
    let gamesRef = rootState.db.collection('games').where('created_by', '==', rootState.user.currentUser.uid)

    gamesRef.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          commit('ADD_GAME', { ...change.doc.data(), id: change.doc.id })
        } else {
          console.log('--- unhandled game change type')
          console.log(shange.type)
        }
      })
    })
  },
  create ({ commit, rootState }, { name, created_by }) {
    let gamesRef = rootState.db.collection('games')

    gamesRef.add({
      name,
      created_by,
      created_on: new Date()
    })
  }
}

export default { namespaced: true, state, mutations, actions }
