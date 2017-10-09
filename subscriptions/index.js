/*
  This file contains all subscriptions to firebase real-time
  data required for the game. Once data is received in these
  callbacks, they in turn dispatch an action creator function
  which updates the local redux store.

  OAR - 2017-10-08
*/
import firebase from '../firebase'
import store, { addUserAction, isLoggedInAction } from '../store'

function registerSubscriptions() {
  console.log('registering firebase subscriptions')

  var userRef = firebase.database().ref('users');

  userRef.on('child_added', function (snapshot) {
    console.log('Received child user info on add: ', snapshot.val())
    let user = snapshot.val()
    if (store.getState().authenticated.users.findIndex(authUser => authUser.userId === user.userId) < 0) {
      console.log('user dispatched to store', user)
      store.dispatch(addUserAction(user))
    } else {
      console.log('received user filtered out', user)
    }
  })

  userRef.on('child_changed', function (snapshot) {
    console.log('Received child user info on change: ', snapshot.val())
    let user = snapshot.val()
    console.log('user dispatched to store', user)
    // whether login changes from false to true this
    // action replaces existing object.
    store.dispatch(isLoggedInAction(user))
  })
}

export default registerSubscriptions
