
import Vue from 'vue'
import Vuex from 'vuex'

import { auth, db } from './firebase.js'

// game data
import user from './modules/user'
import posts from './modules/posts'
import games from './modules/games'
import characters from './modules/characters'
import journal from './modules/journal'
import quests from './modules/quests'
import npcs from './modules/npcs'

// ui automation
import loading from './modules/loading'
import toast from './modules/toast'
import installer from './modules/installer'

Vue.use(Vuex)

const state = {
  auth,
  usersCollection: db.collection('users'),
  gamesCollection: db.collection('games'),
  charactersCollection: db.collection('characters'),
  questsCollection: db.collection('quests'),
  campaignsCollection: db.collection('campaigns'),
  npcsCollection: db.collection('npcs')
}

export default new Vuex.Store({
  state,
  modules: {
    user,
    games,
    characters,
    journal,
    posts,
    quests,
    npcs,
    loading,
    toast,
    installer
  }
})
