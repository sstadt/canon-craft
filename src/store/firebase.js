
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/functions'

const config = {
  apiKey: "AIzaSyD8I_OHG2EsXtYAx8du4nqgBhw1VTpYBJs",
  authDomain: "canon-craft.firebaseapp.com",
  databaseURL: "https://canon-craft.firebaseio.com",
  projectId: "canon-craft",
  storageBucket: "canon-craft.appspot.com",
  messagingSenderId: "51199219735"
}

const app = firebase.initializeApp(config)
const auth = app.auth()
const db = firebase.firestore()
const functions = firebase.functions()
const settings = { timestampsInSnapshots: true }

db.settings(settings)

export { auth, db, functions }
