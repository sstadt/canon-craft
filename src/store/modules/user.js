
import firebase from 'firebase/app'
import 'firebase/auth'

import { isIos } from '@/lib/util.js'

var isSigningUp = false
var userWatcher = null

const userChangeHandler = (change, commit) => {
  switch (change.type) {
    case 'added':
      commit('SET_USER_DATA', { ...change.doc.data(), id: change.doc.id })
      break
    case 'modified':
      commit('UPDATE_USER_DATA', { ...change.doc.data(), id: change.doc.id })
      break
    default:
      console.warn('--- unhandled character change type')
      console.warn(change.type)
  }
}

const state = {
  currentUser: null,
  userData: null,
  loggedIn: false,
  authRequested: false,
  authInitialized: false
}

const mutations = {
  AUTH_INITIALIZED () {
    state.authInitialized = true
  },
  REQUEST_AUTH () {
    state.authRequested = true
  },
  SET_USER (state, user) {
    state.loggedIn = true
    state.currentUser = user
    state.authRequested = false
  },
  UNSET_USER (state) {
    state.loggedIn = false
    state.currentUser = null
  },
  SET_USER_DATA (state, data) {
    state.userData = data
  },
  UPDATE_USER_DATA (state, data) {
    state.userData = data
  }
}

const actions = {
  init ({ commit, rootState }) {
    rootState.auth.onAuthStateChanged(user => {
      userWatcher = rootState.usersCollection.where('uid', '==', user.uid)

      userWatcher.onSnapshot(snapshot =>
        snapshot.docChanges().forEach(change =>
          userChangeHandler(change, commit)))
  
      commit('AUTH_INITIALIZED')

      if (user) {
        if (isSigningUp) {
          isSigningUp = false;
        } else {
          commit('SET_USER', user)
        }
      } else {
        commit('UNSET_USER')
      }
    });
  },
  signup ({ commit, rootState }, { displayName, email, password }) {
    isSigningUp = true;

    rootState.auth.createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        if (user) {
          return user.updateProfile({ displayName })
        }
      })
      .then(() => {
        commit('SET_USER', { user: rootState.auth.currentUser })
      })
      .catch((error) => {
        if (error) {
          console.log('*** Sign Up Error ************')
          console.log(error.code, error.message)
        }
      });
  },
  login ({ rootState }, { email, password }) {
    rootState.auth.signInWithEmailAndPassword(email, password)
      .catch((error) => {
        if (error) {
          console.log('*** Login Error ************')
          console.log(error.code, error.message)
        }
      })
  },
  googleLogin ({ rootState }) {
    var authProvider = new firebase.auth.GoogleAuthProvider()

    if (isIos()) {
      rootState.auth.signInWithRedirect(authProvider)
    } else {
      rootState.auth.signInWithPopup(authProvider)
    }
  },
  requestReset ({ rootState }, email) {
    rootState.auth.sendPasswordResetEmail(email)
      .catch(function(error) {
        if (error) {
          console.log('*** Request Reset Error ************')
          console.log(error.code, error.message)
        }
      });
  },
  requestAuth ({ commit }) {
    commit('REQUEST_AUTH')
  },
  logout ({ rootState }) {
    rootState.auth.signOut()
  }
}

export default { namespaced: true, state, mutations, actions }
