
import firebase from 'firebase/app'
import 'firebase/auth'

import { clone, isIos } from '@/lib/util.js'

var isSigningUp = false
var unsubscribeUser = null

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
  authInitialized: false,
  storageRef: null
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
    state.authRequested = false
    state.currentUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }
  },
  SET_STORAGE (state, { id, storage }) {
    state.storageRef = storage.ref(id)
  },
  UPDATE_USER (state, user) {
    for (let key in user) {
      if (state.currentUser.hasOwnProperty(key)) {
        state.currentUser[key] = user[key]
      }
    }
  },
  UNSET_USER (state) {
    state.loggedIn = false
    state.currentUser = null
    state.userRef = null
    state.storageRef = null
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
      if (user) {
        let userRef = rootState.usersCollection.where('uid', '==', user.uid)
        
        commit('SET_STORAGE', { id: user.uid, storage: rootState.storage })
        unsubscribeUser = userRef.onSnapshot(snapshot =>
          snapshot.docChanges().forEach(change =>
            userChangeHandler(change, commit)))
      }

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
    })
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
      .catch(error => {
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
      .catch(error => {
        if (error) {
          console.log('*** Request Reset Error ************')
          console.log(error.code, error.message)
        }
      })
  },
  updateUser ({ rootState, dispatch, commit }, updatedUser) {
    rootState.auth.currentUser.updateProfile(updatedUser)
      .then(() => {
        commit('UPDATE_USER', updatedUser)
        dispatch('toast/success', 'Profile updated!', { root: true })
      })
      .catch(error => {
        if (error) {
          console.log('*** Update User Error ************')
          console.log(error.code, error.message)
        }
      })
  },
  updatePassword ({ rootState, state, dispatch }, { newPassword, currentPassword }) {
    let credential = firebase.auth.EmailAuthProvider.credential(state.currentUser.email, currentPassword)

    return new Promise((resolve, reject) => {
      rootState.auth.currentUser.reauthenticateAndRetrieveDataWithCredential(credential)
        .then(() => rootState.auth.currentUser.updatePassword(newPassword))
        .then(() => {
          dispatch('toast/success', 'Password updated!', { root: true })
          resolve()
        })
        .catch(error => {
          if (error) {
            switch (error.code) {
              case 'auth/wrong-password':
                dispatch('toast/send', 'Current Password is incorrect!', { root: true })
                break;
            
              default:
                console.log('*** Unknown Password Reset Error ************')
                console.log(error.code, error.message)
                break;
            }
          }
        })
    })
  },
  updateUserData ({ state, rootState }, userData) {
    let userRef = rootState.usersCollection.doc(state.userData.id)
    userRef.set(userData, { merge: true })
  },
  addImage ({ dispatch, state }, imagePath) {
    let userImages = state.userData.images || []
    userImages.push(imagePath)
    dispatch('updateUserData', { images: userImages })
  },
  requestAuth ({ commit }) {
    commit('REQUEST_AUTH')
  },
  logout ({ rootState }) {
    unsubscribeUser()
    rootState.auth.signOut()
  }
}

export default { namespaced: true, state, mutations, actions }
