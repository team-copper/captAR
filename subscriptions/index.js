/*
  This file contains all subscriptions to firebase real-time
  data required for the game. Once data is received in these
  callbacks, they in turn dispatch an action creator function
  which updates the local redux store.

  OAR - 2017-10-08
*/
import firebase from '../firebase'
import store, {
  addUserAction, isLoggedInAction, resetFlagLocation,
  changePlayerStatus
} from '../store'

export function registerUserSubscriptions() {
  console.log('registering user subscriptions')

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

/*
  Subscribe to game info. Either to all instances of a game
  area or to one specific instance.

  gameUrl = 'GameArea1' : subscribe to all game instances in GameArea1
  gameUrl = 'GameArea2/Kw1Z8cX8ygT1EvdUyww' : subscribe to one instance of the
             game in GameArea2
*/
export function registerGameSubscriptions(gameUrl) {
  console.log('registering game subscriptions')

  var gameFlagsRef = firebase.database().ref(gameUrl + '/flags')

  gameFlagsRef.on('value', function (snapshot) {
    console.log('Received child game info on add: ', snapshot.val())
    let gameObjects = snapshot.val()

    for (key in gameObjects) {
      store.dispatch(resetFlagLocation(gameObjects[key]))
    }
  })

  var gamePlayersRef = firebase.database().ref(gameUrl + '/players')

  gamePlayersRef.on('value', function (snapshot) {
    console.log('Received child game info on add: ', snapshot.val())
    let gameObjects = snapshot.val()

    for (key in gameObjects) {
      store.dispatch(changePlayerStatus(gameObjects[key]))

    }
  })
}
