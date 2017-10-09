const firebase =  require('firebase')

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDdcqFO73-rCHWM5QNI0aPy3cr5-HBfZIM",
    authDomain: "captar-d200a.firebaseapp.com",
    databaseURL: "https://captar-d200a.firebaseio.com",
    projectId: "captar-d200a",
    storageBucket: "captar-d200a.appspot.com",
  };

  firebase.initializeApp(config);

// create game session
let gameSessionKey = firebase.database().ref('GameArea1').push().key
firebase.database().ref('GameArea2').child(gameSessionKey).set({
  name: 'GameArea2 Session'
})
console.log('Game session generated: ', gameSessionKey)

let flags = [
  {
      flagId: 1,
      team: 'red',
      startLocation: { latitude: 40.703295, longitude: -74.00845 },
      isTaken: false,
      holder: null,
      currentLocation: null,
  },
  {
      flagId: 2,
      team: 'blue',
      startLocation: { latitude: 40.703414, longitude: -74.008663 },
      isTaken: false,
      holder: null,
      currentLocation: null,
  },
]

for (let i = 0; i < flags.length; i++){
  firebase.database().ref('GameArea2').child(gameSessionKey + '/flags').set(flags[i])
}
console.log('Flags generated')

let players = [
  {
      playerId: 1,
      location: { latitude: 40.703394, longitude: -74.008622 },
      team: 'red',
      hasFlag: false
  },
  {
      playerId: 2,
      location: { latitude: 40.703441, longitude: -74.008713 },
      team: 'blue',
      hasFlag: false
  },
  {
      playerId: 3,
      location: { latitude: 40.703325, longitude: -74.008456 },
      team: 'red',
      hasFlag: false
  },
  {
      playerId: 4,
      location: { latitude: 40.703258, longitude:  -74.008663 },
      team: 'blue',
      hasFlag: true
  }
]

for (let i = 0; i < players.length; i++){
  firebase.database().ref('GameArea2').child(gameSessionKey + '/players').set(players[i])
}

console.log('Players generated')
