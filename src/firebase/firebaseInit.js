import 'firebase/firestore'
import firebase from 'firebase'
import firebaseConfig from './firebaseConfig'

const firebaseApp = firebase.initializeApp(firebaseConfig).firestore()
const settings = { timestampsInSnapshots: true }
firebaseApp.settings(settings)

export default firebaseApp
