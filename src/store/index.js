
import Vue from 'vue'
import Vuex from 'vuex'

import { auth, db } from './firebase.js'

import loading from './modules/loading'
import user from './modules/user'
import games from './modules/games'
import characters from './modules/characters'

Vue.use(Vuex)

const state = { auth, db }

export default new Vuex.Store({
  state,
  modules: {
    loading,
    user,
    games,
    characters
  }
})
