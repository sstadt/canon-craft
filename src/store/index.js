
import Vue from 'vue'
import Vuex from 'vuex'

import { auth, db } from './firebase.js'

// game data
import characters from './modules/characters'
import games from './modules/games'
import journal from './modules/journal'
import posts from './modules/posts'
import quests from './modules/quests'
import user from './modules/user'

// ui automation
import loading from './modules/loading'
import toast from './modules/toast'
import installer from './modules/installer'

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
    posts,
    quests,
    user,
    loading,
    toast,
    installer
  }
})
