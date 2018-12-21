
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/functions'

const config = {
  apiKey: "AIzaSyC9KyUt0NQetkgio6-DIZnT_KTWxUZAvoo",
  authDomain: "when-last-we-played.firebaseapp.com",
  databaseURL: "https://when-last-we-played.firebaseio.com",
  projectId: "when-last-we-played",
  storageBucket: "when-last-we-played.appspot.com",
  messagingSenderId: "469205571624"
}

const app = firebase.initializeApp(config)
const auth = app.auth()
const db = firebase.firestore()
const functions = firebase.functions()
const settings = { timestampsInSnapshots: true }

db.settings(settings)

export { auth, db, functions }
