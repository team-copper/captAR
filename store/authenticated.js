import firebase from '../firebase'

// Action Types
const ADD_USER = 'ADD_USER'
const IS_LOGGED_IN = 'IS_LOGGED_IN'
const IS_LOGGED_OUT = 'IS_LOGGED_OUT'

// Action Creators
export function addUserAction(user) {
  return { type: ADD_USER, user}
}

export function isLoggedInAction(user) {
  return { type: IS_LOGGED_IN, user }
}

export function isLoggedOutAction(localUserKey) {
  return { type: IS_LOGGED_OUT, localUserKey }
}

// Thunks

// Update existing key
export function isLoggedIn(user) {
  return function thunk(dispatch) {
    console.log('key to update: ', user.userId)
    firebase.database().ref('users').child(user.userId).set({
      userId: user.userId,
      email: user.email,
      loggedIn: true
    })
      .then(() => {
        console.log('called the database set')
        dispatch(isLoggedInAction(user))
      })
      .catch(error => console.log(error))
  }
}

// create new entry with new key
export function addUser(email) {
  return function thunk(dispatch) {
    let userKey = firebase.database().ref('users').push().key
    console.log('new key: ', userKey)
    let user = {
      userId: userKey,
      email: email,
      loggedIn: true
    }
    firebase.database().ref('users').child(userKey).set(user)
      .then(() => {
        console.log('user added')
        // commented out as subscription and
        // this have race condition.
        //dispatch(addUserAction(user))
      })
      .catch(error => console.log(error))
  }
}

// Thunks
export function isLoggedOut(localUserKey) {
  return function thunk(dispatch) {
    console.log('key to update: ', localUserKey)
    let userRef = firebase.database().ref('users').child(localUserKey).update({loggedIn: false})
      .then(() => {
        console.log('called the database set')
        dispatch(isLoggedOutAction(localUserKey))
      })
      .catch(error => console.log(error))
  }
}

let initialState = {
  localUserKey: null,
  users: []
}

// REDUCERS
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      let users = [...state.users, action.user]
      return {localUserKey: action.user.userId, users}

    case IS_LOGGED_IN:
      let newStateUsers = state.users.filter(user => user.email !== action.user.email)
      newStateUsers.push(action.user)
      return {localUserKey: action.user.userId, users: newStateUsers}

    case IS_LOGGED_OUT:
      let userToLogout = state.users.filter(user => user.userId === action.localUserKey)
      newStateUsers = state.users.filter(user => user.userId !== action.localUserKey)
      newStateUsers.push(userToLogout)
      let newState = Object.assign({}, state)
      newState.users = newStateUsers
      return newState

    default:
      return state;
  }
}
