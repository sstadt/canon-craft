
import firebase from 'firebase/app'
import 'firebase/auth'

var isSigningUp = false;

const state = {
  currentUser: null,
  loggedIn: false
}

const mutations = {
  SET_USER (state, { user }) {
    state.loggedIn = true
    state.currentUser = user
  },
  UNSET_USER (state) {
    state.loggedIn = false
    state.currentUser = null
  }
}

const actions = {
  init ({ commit, rootState }) {
    rootState.auth.onAuthStateChanged((user) => {
      if (user) {
        if (isSigningUp) {
          isSigningUp = false;
        } else {
          commit('SET_USER', { user })
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
    rootState.auth.signInWithPopup(authProvider)
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
  logout ({ rootState }) {
    rootState.auth.signOut()
  }
}

export default { namespaced: true, state, mutations, actions }
