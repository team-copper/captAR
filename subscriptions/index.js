/*
  This file contains all subscriptions to firebase real-time
  data required for the game. Once data is received in these
  callbacks, they in turn dispatch an action creator function
  which updates the local redux store.

  OAR - 2017-10-08
*/
import firebase from '../firebase'
import store, { addUserAction } from '../store'

function registerSubscriptions() {
  var userRef = firebase.database().ref('users');
  userRef.on('value', function (snapshot) {
    console.log('Received user info: ', snapshot.val())
    let users = snapshot.val()
    for (key in users){
      store.dispatch(addUserAction(users[key]))
    }
  })
}

export default registerSubscriptions
