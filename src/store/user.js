
import firebase from 'firebase/app';
import 'firebase/auth';

const state = {
  currentUser: {}
};

const mutations = {
  SET_USER (state, { user }) {
    state.currentUser = user;
  },
  UNSET_USER () {
    state.currentUser = {};
  }
};

const actions = {
  init ({ commit, rootState }) {
    rootState.app.auth().onAuthStateChanged((user) => {
      if (user) {
        commit('SET_USER', { user });
      } else {
        commit('UNSET_USER');
      }
    });
  },
  login ({ rootState }) {
    var authProvider = new firebase.auth.GoogleAuthProvider();
    return rootState.app.auth().signInWithPopup(authProvider);
  },
  logout ({ rootState }) {
    rootState.app.auth().signOut();
  }
};

export default { namespaced: true, state, mutations, actions };
