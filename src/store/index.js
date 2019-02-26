
import Vue from 'vue'
import Vuex from 'vuex'

import { auth, db } from './firebase.js'

import characters from './modules/characters'
import games from './modules/games'
import journal from './modules/journal'
import loading from './modules/loading'
import posts from './modules/posts'
import quests from './modules/quests'
import toast from './modules/toast'
import user from './modules/user'

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
    characters,
    games,
    journal,
    loading,
    posts,
    quests,
    toast,
    user
  }
})
