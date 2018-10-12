
import Vue from 'vue';
import Vuex from 'vuex';

import firebase from 'firebase/app';
import 'firebase/firestore';

// import user from './user';
// import messages from './messages';

const config = {
  apiKey: "AIzaSyC9KyUt0NQetkgio6-DIZnT_KTWxUZAvoo",
  authDomain: "when-last-we-played.firebaseapp.com",
  databaseURL: "https://when-last-we-played.firebaseio.com",
  projectId: "when-last-we-played",
  storageBucket: "when-last-we-played.appspot.com",
  messagingSenderId: "469205571624"
};

const app = firebase.initializeApp(config);
const db = firebase.firestore();
const settings = { timestampsInSnapshots: true };

db.settings(settings);

Vue.use(Vuex);

const state = { app, db };

export default new Vuex.Store({
  state,
  // modules: { user, messages }
});
