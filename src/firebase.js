// This import loads the firebase namespace along with all its type information.
import * as firebase from 'firebase/app'

// These imports load individual services into the firebase namespace.
import 'firebase/auth'
import 'firebase/database'

const config = {
  apiKey: 'AIzaSyADwvYq54-uLzpPE0FmDd3tbzKUc_1WEW0',
  authDomain: 'transhub-24008.firebaseapp.com',
  databaseURL: 'https://transhub-24008.firebaseio.com',
  projectId: 'transhub-24008',
  messagingSenderId: '200347311166'
}

const app = firebase.initializeApp(config)

const auth = app.auth()
const db = firebase.database()

export { auth, db }
