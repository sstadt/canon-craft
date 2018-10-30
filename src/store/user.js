
import firebase from 'firebase/app'
import 'firebase/auth'

const state = {
  currentUser: null
}

const mutations = {
  SET_USER (state, { user }) {
    state.currentUser = user
  },
  UNSET_USER () {
    state.currentUser = null
  }
}

const actions = {
  init ({ commit, rootState }) {
    rootState.app.auth().onAuthStateChanged((user) => {
      if (user) {
        commit('SET_USER', { user })
      } else {
        commit('UNSET_USER')
      }
    });
  },
  signup ({ rootState }, { email, password }) {
    rootState.app.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
      if (error) {
        console.log('*** Sign Up Error ************')
        console.log(error.code, error.message)
      }
    });
  },
  login ({ rootState }, { email, password }) {
    rootState.app.auth().signInWithEmailAndPassword(email, password).catch((error) => {
      if (error) {
        console.log('*** Login Error ************')
        console.log(error.code, error.message)
      }
    })
  },
  googleLogin ({ rootState }) {
    var authProvider = new firebase.auth.GoogleAuthProvider()
    rootState.app.auth().signInWithPopup(authProvider)
  },
  logout ({ rootState }) {
    rootState.app.auth().signOut()
  }
}

export default { namespaced: true, state, mutations, actions }
