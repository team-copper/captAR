import * as firebase from 'firebase'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDdcqFO73-rCHWM5QNI0aPy3cr5-HBfZIM",
  authDomain: "captar-d200a.firebaseapp.com",
  databaseURL: "https://captar-d200a.firebaseio.com",
  projectId: "captar-d200a",
  storageBucket: "captar-d200a.appspot.com",
};
firebase.initializeApp(config);

export default firebase;
