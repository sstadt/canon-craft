
const timeout = 3000

const state = {
  messages: []
}

const mutations = {
  ADD_MESSAGE (state, message) {
    state.messages.push(message)
    setTimeout(() => state.messages.shift(), timeout)
  }
}

const actions = {
  send ({ commit }, message) {
    commit('ADD_MESSAGE', message)
  }
}
