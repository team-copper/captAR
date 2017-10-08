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

export function isLoggedOutAction(user) {
  return { type: IS_LOGGED_OUT, user }
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
        console.log('called the database set')
        dispatch(addUserAction(user))
      })
      .catch(error => console.log(error))
  }
}

// Thunks
export function isLoggedOut() {
  return function thunk(dispatch) {
    console.log('key to update: ', this.state.localUserKey)
    let userToLogout = this.state.users.filter(user => user.userId === this.state.localUserKey)
    userToLogout.loggedIn = false
    firebase.database().ref('users/' + this.state.localUserKey).set(userToLogout)
      .then(() => {
        console.log('called the database set')
        dispatch(isLoggedInAction(userToLogout))
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
      let newState = Object.assign({}, state)
      newState.users = users
      return newState

    case IS_LOGGED_IN:
      let newStateUsers = state.users.filter(user => user.email !== action.user.email)
      users = [...newStateUsers, action.user]
      return {localUserKey: action.user.userId, users}

    case IS_LOGGED_OUT:
      newStateUsers = state.filter(user => user.email !== action.user.email)
      users = [...newStateUsers, action.user]
      newState = Object.assign({}, state)
      newState.users = users
      return newState

    default:
      return state;
  }
}
