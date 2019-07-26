
import Vue from 'vue'
import Vuex from 'vuex'

import { auth, db, storage } from './firebase.js'

// game data
import user from './modules/user'
import files from './modules/files'
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
import sidepanel from './modules/sidepanel'

Vue.use(Vuex)

const state = {
  auth,
  storage,
  usersCollection: db.collection('users'),
  gamesCollection: db.collection('games'),
  charactersCollection: db.collection('characters'),
  questsCollection: db.collection('quests'),
  npcsCollection: db.collection('npcs')
}

export default new Vuex.Store({
  state,
  modules: {
    user,
    files,
    games,
    characters,
    journal,
    posts,
    quests,
    npcs,
    loading,
    toast,
    installer,
    sidepanel
  }
})
