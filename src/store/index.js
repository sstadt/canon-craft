
import Vue from 'vue'
import Vuex from 'vuex'

import { auth, db } from './firebase.js'

import loading from './modules/loading'
import toast from './modules/toast'
import user from './modules/user'
import games from './modules/games'
import characters from './modules/characters'
import quests from './modules/quests'
import journal from './modules/journal'

Vue.use(Vuex)

const state = {
  auth,
  db, // TODO: deprecate this in favor of collection references
  gamesCollection: db.collection('games'),
  questsCollection: db.collection('quests')
}

export default new Vuex.Store({
  state,
  modules: {
    loading,
    toast,
    user,
    games,
    characters,
    quests,
    journal
  }
})
